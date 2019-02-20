export function postData(url='',data={}){
    return fetch(url, {
        method:"POST",
        mode:"cors",
        cache:"no-cache",
        credentials:"same-origin",
        headers:{
            "content-type":"application/json",
        },
        redirect:"follow",
        referrer:"no-refferer",
        body: JSON.stringify(data)
    })
}