"use client";
import react from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


const Table = () => {
    const [song, setSong] = react.useState();

    useEffect(() => {
        fetch('/song.json')
          .then(res => res.json())
          .then(setSong);
      }, []);
    console.log(song);
    return (
        <div className="overflow-x-auto">
            <table className="  ">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className=" divide-gray-200">
                    <tr>
                        <td className=" whitespace-nowrap">John Doe</td>
                        <td className=" whitespace-nowrap">Software Engineer</td>
                        <td className=" whitespace-nowrap">Active</td>
                    </tr>
                    <tr>
                        <td className=" whitespace-nowrap">John Doe</td>
                        <td className=" whitespace-nowrap">Software Engineer</td>
                        <td className=" whitespace-nowrap">Active</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
}
export default Table;