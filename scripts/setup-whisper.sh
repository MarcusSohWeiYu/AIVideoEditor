#!/usr/bin/env bash
# Clone + build whisper.cpp into bin/whisper.cpp and download the base.en model.
# Safe to re-run. Needs git, cmake and a C/C++ compiler (Xcode CLT on macOS).
set -euo pipefail
cd "$(dirname "$0")/.."
DIR=bin/whisper.cpp
MODEL="${WHISPER_MODEL:-base.en}"
if [ ! -d "$DIR/.git" ]; then
  git clone --depth 1 https://github.com/ggml-org/whisper.cpp.git "$DIR"
fi
cmake -S "$DIR" -B "$DIR/build" -DCMAKE_BUILD_TYPE=Release
cmake --build "$DIR/build" -j --config Release --target whisper-cli
if [ ! -f "$DIR/models/ggml-$MODEL.bin" ]; then
  bash "$DIR/models/download-ggml-model.sh" "$MODEL"
fi
echo "whisper.cpp ready: $DIR/build/bin/whisper-cli + models/ggml-$MODEL.bin"
