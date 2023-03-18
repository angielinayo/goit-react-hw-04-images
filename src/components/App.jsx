import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { queryPixabayAPI } from './Settings/PixabayApi';
import SearchBar from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { ThreeDots } from 'react-loader-spinner';
import { nanoid } from 'nanoid';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState('');

  const handleSubmit = useCallback(inputValue => {
    setQuery(inputValue);
    setPage(1);
    setSearchResult([]);
    const newId = nanoid();
    setId(newId);
    console.log(newId);
  }, []);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async (query, page) => {
      try {
        setIsLoading(true);
        const result = await queryPixabayAPI(query, page);

        if (result.hits.length === 0) {
          toast.error('No images found');
        }

        if (page === 1 && result.hits.length !== 0) {
          toast.success(`${result.total} images found`);
        }
        setSearchResult(prevResult => [...prevResult, ...result.hits]);
        setTotal(result.total);
      } catch (error) {
        toast.error('No images found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages(query, page);
  }, [query, page, id]);

  const handleLoadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const checkPagesSum = useCallback(() => {
    const pagesSum = Math.ceil(total / 12);
    return page < pagesSum;
  }, [page, total]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />

      <ImageGallery searchResult={searchResult} />
      {isLoading === true && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass="loader"
          visible={true}
        />
      )}
      {query !== '' &&
        searchResult.length !== 0 &&
        isLoading !== true &&
        checkPagesSum(page) && <Button handleLoadMore={handleLoadMore} />}
      <ToastContainer />
    </>
  );
};

export default App;
