#!/usr/bin/env bash
# Clone + build whisper.cpp into bin/whisper.cpp and download its models:
#   base.en  transcription (scripts/transcribe.mjs)
#   small    caption re-timing with DTW (.claude/skills/remotion-reel/scripts/retime-captions.py)
# Safe to re-run. Needs git, cmake and a C/C++ compiler (Xcode CLT on macOS).
set -euo pipefail
cd "$(dirname "$0")/.."
DIR=bin/whisper.cpp
MODELS="${WHISPER_MODELS:-base.en small}"
if [ ! -d "$DIR/.git" ]; then
  git clone --depth 1 https://github.com/ggml-org/whisper.cpp.git "$DIR"
fi
cmake -S "$DIR" -B "$DIR/build" -DCMAKE_BUILD_TYPE=Release
cmake --build "$DIR/build" -j --config Release --target whisper-cli
for MODEL in $MODELS; do
  if [ ! -f "$DIR/models/ggml-$MODEL.bin" ]; then
    bash "$DIR/models/download-ggml-model.sh" "$MODEL"
  fi
done
echo "whisper.cpp ready: $DIR/build/bin/whisper-cli + models: $MODELS"
