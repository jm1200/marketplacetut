/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { api } from "../utils/api";
import { useRouter } from "next/router";

type SellItemForm = {
  name: string;
  description: string;
  price: string;
};

const SellItem: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SellItemForm>();
  const createListing = api.listings.create.useMutation();
  const router = useRouter();

  const onSubmit = (data: SellItemForm) => {
    createListing
      .mutateAsync({
        ...data,
        price: parseFloat(data.price),
      })
      .then(() => {
        router.push("/");
      })
      .catch((e) => console.log("sell-item.tsx 28 e:", e));
  };
  return (
    <>
      <Head>
        <title>Sell Iem</title>
        <meta name="description" content="Sell Item" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Item Name
            </label>

            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>

            <textarea
              id="description"
              {...register("description", { required: true })}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>

            <input
              type="number"
              step={0.01}
              id="price"
              {...register("price", { required: true })}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </main>
    </>
  );
};

export default SellItem;
