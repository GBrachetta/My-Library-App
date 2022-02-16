/* eslint-disable no-underscore-dangle */
import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackButton from '../components/BackButton';
import ComposerItem from '../components/ComposerItem';
import Spinner from '../components/Spinner';
import Title from '../components/Title';
import { getComposers, reset } from '../features/composers/composerSlice';

const Composers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    composers: rawComposers,
    isLoading,
    isSuccess,
  } = useSelector((state) => state.composers);

  const dispatch = useDispatch();

  const fuse = new Fuse(rawComposers, {
    keys: ['surname', 'country'],
    threshold: 0.4,
  });

  const results = fuse.search(searchTerm);
  const composerResults = results.map((result) => result.item);

  useEffect(() => {
    dispatch(getComposers());

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  if (isLoading) return <Spinner />;

  const composers = searchTerm
    ? composerResults.map((composer) => (
        <ComposerItem key={composer._id} composer={composer} />
      ))
    : []
        .concat(rawComposers)
        .sort((a, b) => (a.surname > b.surname ? 1 : -1))
        .map((composer) => (
          <ComposerItem key={composer._id} composer={composer} />
        ));

  return (
    <>
      <Title title="Composers" />

      <section className="grid place-items-center border-b-2 ">
        <p className="text-l text-gray-400 py-3">
          FILTER BY COMPOSER OR COUNTRY
        </p>
        <input
          className="text-gray-700 mb-5 form-input"
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      <section className="table w-full">
        <div className="table-header-group my-5 border-b-2 border-2">
          <div className="table-row ">
            <div className="table-cell border-b py-5 border-gray-600 font-bold">
              Name
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold text-right">
              Country
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold text-right">
              Born
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold text-right">
              Died
            </div>
            <div className="table-cell border-b py-5 border-gray-600" />
          </div>
        </div>
        <div className="table-row-group border-collapse border">
          {composers.length ? (
            composers
          ) : (
            <p className="mt-5">No matching composers found</p>
          )}
        </div>
      </section>
      <BackButton url="/" />
    </>
  );
};

export default Composers;
