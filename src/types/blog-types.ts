// -- == [[ IMPORTS ]] == -- \\

// Types

import { type User } from "./user-types";



// -- == [[ TYPES ]] == -- \\

// Blog Article

export type Article = {

    _id: string;                        // Handled by MongoDB (BlogID)

    author: User;                       // Author info of the blog creator
    createdAt: Date;                    // Date timestamp of when the article was created

    coverImage: string;                 // URL of main article image
    title: string;                      // Title of the blog article (min 3 chars, max 100 chars)
    body: string;                       // The body of the blog article

    comments: Comment[];                // An array of comments on the blog

    likedBy: string[];                  // An array of UserIDs that point to who liked the blog

}





// const textSection1: TextSection = {

//     image: {

//         url: "https://static.wixstatic.com/media/0e0314_20c9171713d947b8bd599af42798f491~mv2.png/v1/fill/w_740,h_423,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/0e0314_20c9171713d947b8bd599af42798f491~mv2.png",

//         appearsBeforeText: true

//     },

//     body: "When it comes to designing a blog, there are many different elements that need to be thoughtfully considered in order to make it both visually appealing and functional. The overall layout and structure of your blog is one of the most important aspects, as it dictates your reader’s experience. It also determines how posts will be organized and ordered, as well as where images will go, and which features will be included. "

// }

// const textSection2: TextSection = {
//     body: "The design of your blog can also impact how likely it is for users to find it. Incorporating social media including sharing buttons into the design of your blog posts can help to increase your blog’s exposure."
// }

// const textSection3: TextSection = {
//     body: "Ultimately, blogs come in all shapes and sizes and offer a great way to creatively express yourself, share your work, or provide helpful advice. With the right optimization and attention to detail, you can create the perfect blog for yourself or your business."
// }

// const textSection4: TextSection = {
//     body: "Whether you already have a blog or are considering starting one, learning how to make a website and design it is paramount for gaining readership and retaining visitors. In this article, we’ll offer examples that can help inspire your own and help lay out the most important elements of blog design."
// }

// const articleSection1: ArticleSection = {
//     heading: "",
//     textSections: [textSection1, textSection2, textSection3, textSection4]
// }





// const textSection5: TextSection = {
//     body: "Whether you're a personal blog, business blog, or anything in between, the design of your blog plays a major role in how well it is received by readers and search engines alike. Every element of design should be taken into consideration when creating or updating your blog, as a great design creates a better experience for your readers."
// }

// const textSection6: TextSection = {
//     body: "Launching a successful blog design takes a degree of planning. Before beginning the design process, it’s essential to think about the purpose of your blog. Identify its key goals, niche and your own personal or brand style. All of these should influence the design of your blog."
// }

// const textSection7: TextSection = {
//     body: "First and foremost, you should create a visually appealing layout that is easy to navigate. This means selecting an appropriate website template or theme with plenty of white space. Prioritize attractive, web-friendly/safe fonts (clear typography) that make it easy to read this type of website. You should also include navigation elements that make moving around your blog easier - such as an effective navigation bar and social media buttons"
// }

// const articleSection2: ArticleSection = {
//     heading: "What is great blog design?",
//     textSections: [textSection5, textSection6, textSection7]
// }





// const someBlogArticle: Article = {

//     author: "123-3223",
//     createdAt: new Date(),
//     title: "10 examples of blog design done right, plus tips to create your own",
//     sections: [articleSection1, articleSection2]

// }

// console.log(someBlogArticle);