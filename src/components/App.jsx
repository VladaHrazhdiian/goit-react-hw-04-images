import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Container from '@mui/material/Container';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';

import getImages from 'services/api';

export default function App() {
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await getImages(searchQuery, page);

        const totalPages = Math.floor(response.totalHits / 12);

        if (response.hits.length === 0) {
          Notify.warning(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setHits((prevHits) =>
          page === 1 ? [...response.hits] : [...prevHits, ...response.hits]
        );
        setTotalPages(totalPages);

        if (page === 1) {
          Notify.success(`Hooray! We found ${response.totalHits} images.`);
        } else {
          setTimeout(() => scroll(), 100);
        }

        if (page >= totalPages) {
          Notify.warning(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } catch (err) {
        Notify.failure(`Oops, something went wrong: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery !== '') {
      fetchImages();
    }
  }, [searchQuery, page]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const queryInput = evt.target.elements.queryInput;
    const newSearchQuery = queryInput.value.trim();

    if (newSearchQuery === searchQuery) {
      Notify.warning('You have already submitted this query.');
      return;
    }

    queryInput.value = '';
    setPage(1);
    setHits([]);
    setSearchQuery(newSearchQuery);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const scroll = () => {
    const clientHeight = document.documentElement.clientHeight;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };

  const isNotEmpty = hits.length !== 0;
  const isNotEndList = page < totalPages;

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        {isNotEmpty && <ImageGallery hits={hits} />}
        {isLoading ? (
          <Loader />
        ) : (
          isNotEmpty && isNotEndList && <Button onLoadMore={handleLoadMore} />
        )}
      </Container>
    </>
  );
}