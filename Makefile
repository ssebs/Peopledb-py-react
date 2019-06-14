all:
	@echo "please enter a subcommand"
api:
	@cd flask-ppl-api/ && python3 run.py
react: run
	@
frontend: run
	@
run:
	@cd peopledb/ && npm start
build:
	@cd peopledb/ && npm run build
