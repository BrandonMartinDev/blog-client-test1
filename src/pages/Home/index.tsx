// -- == [[ IMPORTS ]] == -- \\

import './homePage.css';

import useGetFeaturedBlogs from '@hooks/useGetFeaturedBlogs';

import { Article } from '@custom-types/blog-types';

import {
    MainArticlePreview,
    ArticlePreview,
    LargeError
} from "@global-components/exportGlobalComponents.ts";



// -- == [[ COMPONENTS ]] == -- \\

const HomePageLoading = () => {

    return (
        <div className="home container">
            <main className="home-main">
                <MainArticlePreview isLoading={true} />
            </main>
            <div className="home-grid">
                <ArticlePreview isLoading={true} />
                <ArticlePreview isLoading={true} />
                <ArticlePreview isLoading={true} />
            </div>
        </div>
    )
}

const HomePage = () => {

    // Gets featured blogs from useGetFeaturedBlogs hook

    const { featuredBlogs, err } = useGetFeaturedBlogs();


    // Checks if there was an error, and if featuredBlogs' length is greater than 1

    if (err || (featuredBlogs && !featuredBlogs.length)) return (

        <LargeError
            mainText="There was an error loading featured blogs..."
            subText="We're sorry about that! Please try again later."
        />

    );

    if (!featuredBlogs) return <HomePageLoading />;

    const mainFeaturedBlog = featuredBlogs[0];

    return (
        <div className="home container">

            <main className="home-main">
                <MainArticlePreview key={mainFeaturedBlog._id} articleInfo={mainFeaturedBlog} />
            </main>

            <aside className="home-aside">

            </aside>

            <div className="home-grid">

                {featuredBlogs.map((featuredBlog: Article, index: number) => {

                    if (index === 0) return;
                    return <ArticlePreview key={featuredBlog._id} articleInfo={featuredBlog} />;

                })}

            </div>

        </div>
    )
}

export default HomePage