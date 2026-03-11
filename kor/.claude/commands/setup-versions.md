---
description: 병렬 구현을 위한 3개 버전 디렉토리 생성
allowed-tools: [Read, Write, Bash, Glob, Grep, Edit]
---

선택된 프로토타입을 기반으로 3개 버전 디렉토리를 생성하세요.

## 인자
$ARGUMENTS = 선택된 프로토타입 (a, b, or c)

## 수행 작업

1. 선택된 프로토타입 확인: prototypes/interface-$ARGUMENTS/

2. analysis/requirements.json을 읽어서 프로젝트 정보 파악

3. versions/v1, v2, v3 디렉토리 각각에 대해:

   a. 디렉토리 구조 생성:
      ```
      versions/vN/
      ├── CLAUDE.md
      ├── .claude/commands/
      │   ├── implement.md
      │   ├── build-check.md
      │   ├── self-review.md
      │   └── iterate.md
      └── prototype/
      ```

   b. 선택된 프로토타입 코드를 prototype/에 복사

   c. templates/CLAUDE.md.template를 읽고, analysis/ 데이터를 기반으로 변수 치환하여 CLAUDE.md 생성:
      - {{PROJECT_NAME}}: requirements.json의 project_name
      - {{VERSION_NUMBER}}: 1, 2, 3
      - {{PROJECT_DESCRIPTION}}: prd.md에서 프로젝트 개요
      - {{TECH_STACK}}: requirements.json의 tech_stack

   d. templates/commands/*.template 파일들을 읽고 .claude/commands/ 스킬 생성

4. 사용자에게 안내:
   ```
   3개 버전 디렉토리가 준비되었습니다.
   각각 새 터미널을 열고 다음을 실행하세요:
   Terminal 1: cd versions/v1 && claude → /implement
   Terminal 2: cd versions/v2 && claude → /implement
   Terminal 3: cd versions/v3 && claude → /implement
   ```
