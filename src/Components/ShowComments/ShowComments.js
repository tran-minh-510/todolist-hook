import React from "react";
import "./ShowComments.scss";
import { useState } from "react";
// import ReactPaginate from 'react-paginate';

export default function ShowComments(props) {
    const { listJobs, setListJobs } = props;
    const [editID, setEditID] = useState(-1);
    const [valueEdit, setValueEdit] = useState("");
    const setChecked = (e, id, isChecked) => {
        if (e.target.closest(".li-edit")) {
            if (!e.target.closest(".edit") && !e.target.closest(".input-edit")) {
                fetch(`http://localhost:3004/jobs/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ isChecked: !isChecked }),
                });
                setListJobs((prev) => {
                    const listJobs = [...prev];
                    return listJobs;
                });
                if (editID === id) {
                    setEditID(-1);
                }
            }
        }
    };
    const deleteJob = (id) => {
        fetch(`http://localhost:3004/jobs/${id}`, {
            method: "DELETE",
        });
    };
    const editJob = (e, id) => {
        if (e.target.closest(".edit")) {
            setEditID((prev) => {
                if (prev !== id) {
                    return id;
                }
                return -1;
            });
        }
        fetch(`http://localhost:3004/jobs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: valueEdit }),
        });
        setListJobs((prev) => {
            const listJobs = [...prev];
            return listJobs;
        });
    };

    // const [itemOffset, setItemOffset] = useState(0);

    // // Simulate fetching items from another resources.
    // // (This could be items from props; or items loaded in a local state
    // // from an API endpoint with useEffect and useState)
    // const endOffset = itemOffset + 3;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // const currentItems = listJobs.slice(itemOffset, endOffset);
    // const pageCount = Math.ceil(listJobs.length / 3);

    // // Invoke when user click to request another page.
    // const handlePageClick = (event) => {
    //     const newOffset = (event.selected * 3) % listJobs.length;
    //     console.log(event)
    //     setItemOffset(newOffset);
    // };
    return (
        <>
            <div className="my-3 border-bottom w-25">
                <h3 className="float-start">Jobs list :</h3>
            </div>
            <div className="my-3">
                <ul className="list-group">
                    {listJobs.length > 0 ? (
                        listJobs.map(({ id, content, isChecked }) => {
                            return (
                                <>
                                    <li
                                        onClick={(e) => {
                                            setChecked(e, id, isChecked)
                                            setValueEdit(content)
                                        }}
                                        className={`list-group-item ${isChecked ? "checked" : ""
                                            } li-edit`}
                                        key={id}
                                    >
                                        {editID === id ? (
                                            <input
                                                type="text"
                                                class="form-control w-50 input-edit"
                                                placeholder="Job..."
                                                value={valueEdit}
                                                onChange={(e) => setValueEdit(e.target.value)}
                                            />
                                        ) : (
                                            content
                                        )}
                                        <div className="float-end cusor-poiter">
                                            <button
                                                type="button"
                                                className="btn btn-primary mx-2 edit"
                                                disabled={isChecked}
                                                onClick={(e) => {
                                                    editJob(e, id);
                                                    setValueEdit(content);
                                                }}
                                            >
                                                {editID === id ? <span>Save</span> : <span>Edit</span>}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => deleteJob(id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                </>
                            );
                        })
                    ) : (
                        <h2>Don't have job</h2>
                    )}
                </ul>
            </div>
            {/* <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            /> */}
        </>
    );
}
