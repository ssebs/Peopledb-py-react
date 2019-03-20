# Peopledb-py-react

Person Database using python, flask, sqlite3, react.

## Installing
- Install deps from pkg manager
    - Ubuntu:
        - `$ sudo apt install python3 python3-pip sqlite3 nodejs npm`
    - Arch:
        - `$ sudo pacman -S sqlite3 nodejs npm python3 python3-pip`
- Install python pkgs
    - `$ sudo pip3 install flask flask-cors pysqlite3 `

- Clone this repo
- `$ cd Peopledb-py-react`
- Clone the flask-ppl-api [repo](github.com/ssebs/flask-ppl-api)
- `$ cd flask-ppl-api/`
  - `$ ./init_db.sh`
- `$ cd ..`
- `$ cd peopledb/`
  - `$ npm install`

## Running
- `$ make api`
- `$ make frontend`

## Building
- ?
