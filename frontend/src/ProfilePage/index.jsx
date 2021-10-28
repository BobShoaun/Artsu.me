import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { users } from "../users.json";

import {Link, useParams} from "react-router-dom";

import { tags } from "../tags.json";
import {artworks} from "../artworks.json";

const ProfilePage = () => {
    const { slug } = useParams();
    const user = users.find(user => user.slug === slug);

    const primary = { main: "rose-600", light: "rose-500", dark: "rose-700" };
    const secondary = { main: "teal-700", light: "teal-500", dark: "teal-800" };

    return (
        <main className="dark:bg-gray-900">
            <Navbar />
            <div className="container mx-auto mb-20 flex py-20 gap-8">
                <aside style={{ flexBasis: "12em" }}>
                    <div className="flex flex-wrap gap-3">
                        <img
                            style={{ maxWidth: "12em" }}
                            className="shadow-lg rounded-full"
                            src={user.avatar}
                            alt={`${user.name} avatar`}
                        />
                    </div>
                    <h3 className="dark:text-gray-200 mb-3 font-semibold content-center">{user.name}</h3>
                </aside>
                <section className="dark:bg-gray">
                    <ul className="items-centre gap-10 container mx-auto">
                        <ul className="flex items-center gap-10 container mx-auto">
                            <li color="white">
                                <h3 className="dark:text-gray-200 mb-3 font-semibold">email: </h3>
                            </li>
                            <li className="ml-auto">
                                <input
                                    className="px-2 py-1 w-96 min-w-full outline-none text-white bg-transparent border-opacity-50 focus:border-opacity-100 border-gray-200"
                                    type="text"
                                    aria-valuetext={user.email}
                                    style={{ borderBottomWidth: "1px" }}
                                />
                            </li>
                        </ul>
                        <ul className="flex items-center gap-10 container mx-auto">
                            <li>
                                <h3 className="dark:text-gray-200 mb-3 font-semibold">password:</h3>
                            </li>
                            <li className="ml-auto">
                                <input
                                    className="px-2 py-1 w-96 min-w-full outline-none text-white bg-transparent border-opacity-50 focus:border-opacity-100 border-gray-200"
                                    type="text"
                                    style={{ borderBottomWidth: "1px" }}
                                />
                            </li>
                        </ul>
                        <ul className="flex items-center gap-10 container mx-auto">
                            <li>
                                <h3 className="dark:text-gray-200 mb-3 font-semibold">new password:</h3>
                            </li>
                            <li className="ml-auto">
                                <input
                                    className="px-2 py-1 w-96 min-w-full outline-none text-white bg-transparent border-opacity-50 focus:border-opacity-100 border-gray-200"
                                    type="text"
                                    style={{ borderBottomWidth: "1px" }}
                                />
                            </li>
                        </ul>
                        <ul className="flex items-center gap-10 container mx-auto">
                            <li>
                                <h3 className="dark:text-gray-200 mb-3 font-semibold">confirm password:</h3>
                            </li>
                            <li className="ml-auto">
                                <input
                                    className="px-2 py-1 w-96 min-w-full outline-none text-white bg-transparent border-opacity-50 focus:border-opacity-100 border-gray-200"
                                    type="text"
                                    style={{ borderBottomWidth: "1px" }}
                                />
                            </li>
                        </ul>
                        <ul className="flex items-center gap-10 container mx-auto">
                            <li color="white">
                                <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm">Submit</button>
                            </li>
                        </ul>
                    </ul>
                </section>
            </div>
            <section
                className="py-20 bg-gradient-to-b from-gray-800 to-gray-900"
                id="artworks"
            >
                <div className="container mx-auto">
                    <h1 className="dark:text-white text-2xl font-semibold text-center mb-14">
                        My Artworks
                    </h1>
                    <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-10">
                        {user.portfolioSettings.artworkIds.map(id => {
                            const artwork = artworks.find(artwork => artwork.id === id);
                            return (
                                <Link
                                    to={`/artwork/${artwork.id}`}
                                    key={artwork.id}
                                    className={`bg-gradient-to-br from-transparent to-transparent hover:from-${primary.main} hover:to-${secondary.main} transition-all rounded-lg p-7 cursor-pointer hover:shadow-xl`}
                                >
                                    <img
                                        style={{ maxWidth: "10em" }}
                                        className="mb-5 shadow-xl mx-auto"
                                        src={artwork.image}
                                        alt={artwork.name}
                                    />
                                    <div className="pl-3">
                                        <h2 className="dark:text-white text-lg font-semibold mb-1">
                                            {artwork.name}
                                        </h2>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="container mx-auto">
                    <ul className="flex items-center gap-10 container mx-auto">
                        <li>
                            <h3 className="dark:text-gray-200 mb-3 font-semibold">Add Artwork:</h3>
                        </li>
                        <li color="white">
                            <button className="text-gray-800 font-semibold bg-gray-200 hover:bg-opacity-90 bg-opacity-75 py-1 px-3 text-sm">Upload</button>
                        </li>
                    </ul>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default ProfilePage;
