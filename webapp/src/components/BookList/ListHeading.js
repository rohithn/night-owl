import React, { useEffect, useState } from "react";
import "./modal.css";

const ListHeading = ({
  heading,
  handleSort,
  allCategories,
  selectedCategories,
  handleSelectionChange,
}) => {
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    setSelection(
      allCategories.map((c) => {
        return {
          id: c.id,
          value: c.name,
          checked: selectedCategories.includes(c.id) ? true : false,
        };
      })
    );
  }, []);

  const handleChange = (e) => {
    const list = [...selection];
    setSelection(
      list.map((c) => {
        return {
          ...c,
          checked: e.target.id === c.id ? !c.checked : c.checked,
        };
      })
    );
  };

  const handleFilter = (e) => {
    handleSelectionChange(
      selection.filter((c) => c.checked === true).map((c) => c.id)
    );
  };

  return (
    <div className="list-heading">
      <h4 className="list-heading-title">{heading}</h4>
      <div>
        <button
          type="button"
          className="btn btn-outline-warning mx-3 pe-auto"
          onClick={handleSort}
        >
          Sort by Rating
        </button>
        <button
          type="button"
          className="btn btn-outline-warning"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Filter
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Select Categories
                </h5>
              </div>
              <div className="modal-body">
                {selection.map((c) => (
                  <div key={c.id} className="form-check py-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={c.value}
                      id={c.id}
                      defaultChecked={c.checked}
                      onChange={handleChange}
                    />
                    <label className="form-check-label ps-2" htmlFor={c.id}>
                      {c.value.toUpperCase()}
                    </label>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={handleFilter}
                  data-bs-dismiss="modal"
                  disabled={selection.length === 0 ? true : false}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListHeading;
