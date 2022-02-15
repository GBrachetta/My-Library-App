/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackButton from '../components/BackButton';
import ComposerItem from '../components/ComposerItem';
import Spinner from '../components/Spinner';
import Title from '../components/Title';
import { getComposers, reset } from '../features/composers/composerSlice';

const Composers = () => {
  const { composers, isLoading, isSuccess } = useSelector(
    (state) => state.composers,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComposers());

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Title title="Composers" />

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
          {composers.map((composer) => (
            <ComposerItem key={composer._id} composer={composer} />
          ))}
        </div>
      </section>
      <BackButton url="/" />
    </>
  );
};

export default Composers;
