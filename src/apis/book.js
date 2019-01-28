export function getBooks(){
    return new Promise(function(resolve,reject){
        fetch("https://edubig.vn/api/books", {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(response){
            resolve(response);
        });
    });
}

export function getListCategory(){
    return new Promise(function(resolve,reject){
        fetch("http://benhvienxuongkhop.vn/api/category_parrent.php", {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(response){
            resolve(response);
        });
    });
}

export function getListCategorySmall(id){
    return new Promise(function(resolve,reject){
        fetch("http://benhvienxuongkhop.vn/api/category_child.php?term_id="+id, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(response){
            resolve(response);
        });
    });
}

export function getContentView(id){
    return new Promise(function(resolve,reject){
        fetch("http://benhvienxuongkhop.vn/api/content.php?term_id="+id, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(response){
            resolve(response);
        });
    });
}


export function search(keywword){
    return new Promise(function(resolve,reject){
        fetch("http://bvxk.vatphamtamlinh.net/api/search.php?kwd="+keywword, {
            method: "GET",
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(response){
            resolve(response);
        });
    });
}