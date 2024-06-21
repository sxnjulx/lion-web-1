export const rootpoint = 'http://localhost:8080/'


// const GetEndpoints = {

//     getBlogs: "getblogs",
// }
// const PostEndponts ={
//     createBlog: "createblog"

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
        console.log('fetch function....')
        const response = await fetch(rootpoint+ endpoint);
        console.log("reponse.....", response)
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
