import getConfig from 'next/config';
import Layout from '@/components/Layout';
import { useState, useEffect, useMemo } from 'react';

//component
import Card from '@/components/Home/Card';
import Pagination from '@/components/Home/Pagination';
import Searchbox from '@/components/Home/Searchbox';

//json data
import Data from './../dummyjson/data.json';
import Upload from '@/components/Home/Upload';

//import
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const { publicRuntimeConfig } = getConfig();


const Home = () => {

  const [results, setResults] = useState([]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    // Fetch data from dummy data JSON file
    fetchData();
  }, [page, limit]);

  const convertToComponents = (data) => {
    return data.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image: item.image,
        description: item.description,
        position: { x: 0, y: 0 },
        component: null
      };
    });
  };

  const fetchData = () => {
    // Calculate start index and end index for current page

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;


    // Update state with fetched data
    setResults(convertToComponents(Data.slice(startIndex, endIndex)));
    setTotalPages(Math.ceil(Data.length / limit));
    setTotalResults(Data.length);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };


  //states
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = new useState(Data);



  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    setSearch(query)
    // Create copy of item list
    var updatedList = [...Data];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      // return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      return item.title.toLowerCase().includes(query.toLowerCase())
    });
    const startIndex = (0) * limit;
    const endIndex = startIndex + limit;

    // Trigger render with updated values
    setResults(updatedList.slice(startIndex, endIndex));
  };

  //drag


  let renderResult = useMemo(() => {
    // return convertToComponents(results)
    return results
  }, [results])

  console.log("emmo", renderResult)




  const handleDrag = (id, e, data) => {
    // Handle drag event for a specific component by ID
    setResults(prevComponents => {
      const updatedComponents = [...prevComponents];
      const componentIndex = updatedComponents.findIndex(component => component.id === id);
      updatedComponents[componentIndex].position = { x: data.x, y: data.y };
      return updatedComponents;
    });
  }

  const handleStop = (id, e, data) => {
    // Handle stop event for a specific component by ID
    setResults(prevComponents => {
      const updatedComponents = [...prevComponents];
      const componentIndex = updatedComponents.findIndex(component => component.id === id);
      const draggedComponent = updatedComponents.splice(componentIndex, 1)[0];
      updatedComponents.push(draggedComponent);
      return updatedComponents;
    });
  }

  const handleSave = () => {
    // Handle saving the final position data
    const finalPositionData = results.map(component => {
      return { ...component, position: component.position };
    });
    console.log('Final Position Data:', finalPositionData);
  }


  //lightbox
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index) => {
    setIsOpen(true);
    setPhotoIndex(index);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };


  return (
    <Layout>

      <div className='flex justify-center items-center mt-8 gap-4'>
        <Searchbox search={search} setSearch={setSearch} filterBySearch={filterBySearch} />
      </div>
      <section className='flex justify-center items-center mt-8 gap-4 flex-wrap'>
        {
          renderResult?.map((i, key) => {
            return (
              <Card key={key} i={i} search={search} handleStop={handleStop} handleDrag={handleDrag} openLightbox={openLightbox} closeLightbox={closeLightbox} index={key} />
            )
          })
        }
      </section>

      <div className='flex justify-center items-center mt-8'>
        <Pagination handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} totalPages={totalPages} page={page} setPage={setPage} />
      </div>
      <div className='flex item-center justify-end pr-4 mt-4'>
        <Upload setResults={setResults} results={results} />
      </div>

      {/* Render the lightbox */}
      {isOpen && (
        <Lightbox
          mainSrc={renderResult[photoIndex].image}
          nextSrc={renderResult[(photoIndex + 1) % renderResult.length].image}
          prevSrc={renderResult[(photoIndex + renderResult.length - 1) % renderResult.length].image}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + renderResult.length - 1) % renderResult.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % renderResult.length)}
          imageTitle={renderResult[photoIndex].title}
          imageCaption={renderResult[photoIndex].description}
          toolbarButtons={[
            // Add custom buttons to the toolbar
            <button key="close" className="ril-close" onClick={closeLightbox}>
              Close
            </button>,
          ]}
        />
      )}
    </Layout>
  );
};

export default Home;
