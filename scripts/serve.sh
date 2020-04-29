#!/usr/bin/env bash

set -euo pipefail


serve -s build -l ${PORT:-3000}