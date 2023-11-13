# cron을 통한 주기적인 크롤링
```cronexp
* * * * * /home/ubuntu/scripts/kwon.sh
0 0 * * * /home/ubuntu/.pyenv/versions/venv9/bin/python /home/ubuntu/scripts/crawling.py >> /home/ubuntu/logs/crawling.log 2>&1


```
### 가상환경 경로
/home/ubuntu/.pyenv/versions/venv9
/home/ubuntu/.pyenv/versions/venv9/bin/python

### 파이썬 스크립트 경로
/home/ubuntu/scripts
/home/ubuntu/scripts/crawling.py
0분 0시 매일 
0 0 * * * /home/ubuntu/.pyenv/versions/venv9/bin/python
0 0 * * * /home/ubuntu/.pyenv/versions/venv9/bin/python /home/ubuntu/scripts/crawling.py >> /home/ubuntu/logs/crawling.log 2>&1

## 실행 중 문제 
###  Failed to activate virtualenv
- Failed to activate virtualenv.
Perhaps pyenv-virtualenv has not been loaded into your shell properly.
Please restart current shell and try again.

- 크론 작업을 설정할 때 중요한 것은 크론 작업이 실행될 때, 사용자의 전체 쉘 환경(일반적으로 로그인할 때 로드되는 환경)이 자동으로 로드되지 않는다는 점입니다. 이는 크론 작업이 매우 제한된 환경에서 실행된다는 것을 의미합니다. 그 결과, 평소 쉘에서 자동으로 설정되는 환경 변수, 경로, 초기화 스크립트 등이 크론 작업에서는 기본적으로 사용할 수 없습니다.
- pyenv와 pyenv-virtualenv를 사용할 때는 이러한 도구들을 초기화하는 명령어들이 필요합니다. 이 명령어들은 보통 사용자의 쉘 설정 파일(예: .bashrc 또는 .zshrc)에 추가되며, 쉘 세션을 시작할 때마다 자동으로 실행됩니다. 그러나 크론 작업에서는 이러한 초기화 명령어들이 자동으로 실행되지 않기 때문에, 이들을 쉘 스크립트 내에서 명시적으로 호출해야 합니다.
```shell
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv virtualenv-init -)"
```

```md
- PYENV_ROOT과 PATH 환경 변수 설정: pyenv가 설치된 위치와 그 실행 파일의 경로를 환경 변수에 추가합니다.
- eval "$(pyenv init --path)": 현재 쉘 환경에서 pyenv를 사용할 수 있도록 초기화합니다.
- eval "$(pyenv virtualenv-init -)": pyenv와 함께 pyenv-virtualenv 플러그인을 사용할 수 있도록 초기화합니다.
```

### /home/ubuntu/.pyenv/versions/venv9/lib/pypy3.9/site-packages/certifi/cacert.pem None
- requests 라이브러리에서 내부적으로 사용하는 certifi의 CA인증서 파일 참조 문제
  - pip uninstall certifi, pip install certifi를 사용한 재설치
    - 해결 X
  - CA 인증서 경로 재설정 
    - 해결 X
  - requests.get(url,verify = False)
    - warning 발생, 코드는 동작
  