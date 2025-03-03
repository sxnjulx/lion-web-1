export const rootpoint = 'http://localhost:5000/'


// const GetEndpoints = {

//     getBlogs: "getblogs",
// }
// const PostEndponts ={
//     createBlog: "createBlog"

// }


export const apiService = {

    // sendRequest:async (restEndpoint)=>{
    //     if (GetEndpoints[restEndpoint] != undefined){

    //     }

    // },


    sharedData: () =>{
        return('hi hi hi')
    },
    fetchData: async (endpoint) => {
        const response = await fetch(rootpoint+ endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    },
    postData: async (endpoint, data) => {
        const response = await fetch(rootpoint+endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
};
