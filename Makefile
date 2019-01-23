all:
	@echo "please enter a subcommand"
api:
	@cd flask-ppl-api/ && python3 main.py
run:
	@npm start
build:
	@echo "todo: learn how to build..."