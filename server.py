from flask import Flask, render_template, request, jsonify
import csv

DATAFILE = "data/data.csv"
app = Flask(__name__)


def read_csv(fn):

    ret = []

    with open(fn, "r+") as file:
        reader = csv.DictReader(file, fieldnames=["id", "ala", "bala", "portocala"])
        for row in reader:
            ret.append(row)

    return ret[1:]


def write_csv(datafile, new_data):
    with open(datafile, "a+") as file:
        writer = csv.DictWriter(file, fieldnames=["id", "ala", "bala", "portocala"])
        writer.writerow(new_data)


def handle_writing(data_to_write):
    data_to_write["id"] = max([int(r["id"]) for r in read_csv(DATAFILE)]) + 1
    write_csv(DATAFILE, data_to_write)
    return read_csv(DATAFILE)


@app.route("/", methods=["GET", "POST"])
def index():

    if request.is_json:
        data_to_write = request.json
        return jsonify(handle_writing(data_to_write))

    if request.method == "POST":
        handle_writing(request.form.to_dict())

    data = read_csv(DATAFILE)

    return render_template("index.html", data=data)


if __name__ == "__main__":
    app.run(debug=True)
