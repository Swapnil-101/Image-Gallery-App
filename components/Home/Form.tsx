import React, { useState, ChangeEvent, FormEvent } from "react";
import { ImageToBase64 } from "../../utils/tool";

interface FormData {
  title: string;
  description: string;
  image: any;
  
}

const Form: React.FC = ({ toggleModel, setResults, results }: any) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    image: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("titlt==>", name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0] || null;
    let img = URL?.createObjectURL(image);
    
    let imageUrl = await ImageToBase64(img);
    setFormData({
      ...formData,
      image: imageUrl,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("formdata", formData, [
      { ...formData, id: results.length + 1 },
      ...results,
    ]);
    setResults([{ ...formData, id: results.length + 1 }, ...results]);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="w-full max-w-sm bg-white rounded-md overflow-hidden">
        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Upload Your Image
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Title
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="description"
              type="text"
              value={formData.description}
              name="description"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={toggleModel}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
