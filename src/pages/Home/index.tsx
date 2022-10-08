import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { getGames } from '../../services/api'
import LoadingPage from '../../components/Loading';
import ListGames from '../../components/ListGames';
import {
  ChevronDownIcon,
  FunnelIcon,
} from '@heroicons/react/20/solid';

const sortOptions = [
  { name: 'Alphabetical' },
  { name: 'Popularity' },
  { name: 'Release date' },
  { name: 'Relevance' },
];
const Categories = [
  { name: 'All' },
  { name: 'PC' },
  { name: 'browser' },
];

export default () => {
  const [Loading, setLoading] = useState<boolean>(false);
  const [Error, setError] = useState<boolean>(false);
  const [Games, setGames] = useState<any>([]);
  const [Category, setCategory] = useState<string>('All');
  const [Sort, setSort] = useState<string>('Alphabetical');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const AllGames = () => {
    setError(false);
    setLoading(true);
    getGames({ Category, Sort })
      .then(resp => {
        setGames(resp.data)
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    AllGames();
  }, [Category, Sort]);

  return (
    <div id="home">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {Categories.map(category => (
                        <li key={category.name}>
                          <button
                            type="button"
                            onClick={() => setCategory(category.name)}
                            className={`${Category === category.name && 'text-blue-500 font-bold'} block px-2 py-3`}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-8 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Games
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map(option => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => setSort(option.name)}
                              className={`
                                ${
                                  Sort === option.name
                                    ? 'font-bold text-blue-500'
                                    : 'text-gray-500'
                                }
                                ${active ? 'bg-gray-100' : ''}
                                'block px-4 py-2 text-sm'
                              `}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {Categories.map(category => (
                    <li key={category.name}>
                      <button
                        type="button"
                        className={`${Category === category.name && 'text-blue-500 font-bold'}`}
                        onClick={() => setCategory(category.name)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </form>

              {/* Games grid */}
              <div className="lg:col-span-3">
                {Loading && (
                  <div className="flex justify-center items-center h-full">
                    <LoadingPage />
                  </div>
                )}
                {!Loading && Error && (
                  <div className="flex justify-center items-center h-full">
                    <span className="text-red-500">Houve um erro - Tente novamente mais tarde!</span>
                  </div>
                )}
                {!Loading && !Error && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 h-96 rounded-lg lg:h-full">
                    <ListGames games={Games} />
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
