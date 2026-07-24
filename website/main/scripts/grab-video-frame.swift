// Grab a still frame from a video at a specific timestamp — no ffmpeg needed.
// Useful for pulling a clean frame out of a Reel when the intro has a caption
// overlay (seek past it), or just to get a poster frame at a chosen moment.
//
//   swift scripts/grab-video-frame.swift <video> <out.png> [seconds=5]
//
// qlmanage only ever returns one auto-picked (usually early) frame, so it can't
// skip a caption; this seeks to an exact time. Pair with process-image.js
// email-tile [south] to crop to a 4:5 tile (use "south" to drop a top caption).
import AVFoundation
import AppKit

let args = CommandLine.arguments
guard args.count >= 3 else {
  FileHandle.standardError.write("usage: swift grab-video-frame.swift <video> <out.png> [seconds]\n".data(using: .utf8)!)
  exit(1)
}
let videoPath = args[1]
let outPath = args[2]
let seconds = args.count >= 4 ? (Double(args[3]) ?? 5) : 5

let asset = AVURLAsset(url: URL(fileURLWithPath: videoPath))
let gen = AVAssetImageGenerator(asset: asset)
gen.appliesPreferredTrackTransform = true
gen.requestedTimeToleranceBefore = .zero
gen.requestedTimeToleranceAfter = .zero

do {
  let cg = try gen.copyCGImage(at: CMTime(seconds: seconds, preferredTimescale: 600), actualTime: nil)
  guard let data = NSBitmapImageRep(cgImage: cg).representation(using: .png, properties: [:]) else {
    FileHandle.standardError.write("failed to encode PNG\n".data(using: .utf8)!); exit(1)
  }
  try data.write(to: URL(fileURLWithPath: outPath))
  print("wrote \(outPath) (frame at \(seconds)s)")
} catch {
  FileHandle.standardError.write("failed: \(error)\n".data(using: .utf8)!); exit(1)
}
