#!/bin/bash

# pyenv config env
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv virtualenv-init -)"

export REQUESTS_CA_BUNDLE="/home/ubuntu/.pyenv/versions/venv9/lib/pypy3.9/site-packages/certifi/cacert.pem"

# activate virtualvenv
# aleady local venv activate
#pyenv activate venv9

# run script
python /home/ubuntu/scripts/crawling.py

# deactivate virtualvenv
#pyenv deactivate

