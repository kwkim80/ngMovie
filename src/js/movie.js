  /*************
        SAMPLE URLS
        
        1. To get the config data like image base urls
        https://api.themoviedb.org/3/configuration?api_key=<APIKEY>
        
        2. To fetch a list of movies based on a keyword
        https://api.themoviedb.org/3/search/movie?api_key=<APIKEY>&query=<keyword>
        
        3. To fetch more details about a movie
        https://api.themoviedb.org/3/movie/<movie-id>?api_key=381e09ba86a78d210720788b471eeb8e
        
        4. To fetch a list of people 
        https://api.themoviedb.org/3/person/popular?api_key=<APIKEY>&language=en-US&page=1
        https://api.themoviedb.org/3/search/person?api_key=<APIKEY>&language=en-US&page=1&include_adult=false&query=robert
        *************/
        //const APIKEY is inside key.js
        
        const app = {
            data:null,
            movieData:null,
            baseURL:'https://api.themoviedb.org/3/',
            baseImageURL:null,
            configData:null,
            page:1,
            searchKeyword:null,
            APIKEY:"381e09ba86a78d210720788b471eeb8e", //381e09ba86a78d210720788b471eeb8e //afceb20d31a6c8208b9b126c52b8cdff
            pageShowLink: new Event('pageShowLink'),
            init: ()=>{
                //   let lis=document.querySelectorAll('[data-item-id');
                //   lis.forEach(li=>{
                //       li.addEventListener('click', app.showPara)
                //      });
                let btnSearch=document.getElementById('btnSearch');
                btnSearch.addEventListener('click',app.getPerson);
                history.replaceState({}, 'Home', '#home');
                document.addEventListener('pageShowLink', app.pageConnect);
                window.addEventListener('popstate', app.poppin);
               //app.getPeople();
            },
            getPerson:()=>{
                app.keyword=document.getElementById('txtKeyword').value;
                let url = "".concat(app.baseURL, 'search/person?api_key=',app.APIKEY,'&language=en-US&include_adult=false&query=',app.keyword); 
                fetch(url)
                .then((result)=>{
                    return result.json();
                })
                .then((data)=>{
                      //process the returned data
                       // document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
                        //work with results array...
                        
                    // baseImageURL = data.images.secure_base_url;
                    app.data = data.results;
                    console.log('config:', data);
                    app.nav('actorList');
                    let peopleList=document.getElementById('peopleList');
                    data.results.map(function(peopleJson) { 
                        let div = document.createElement('div'); 
                        div.className="divListItem";
                        let img=document.createElement('img');
                        img.src="".concat('https://image.tmdb.org/t/p/w235_and_h235_face/',peopleJson.profile_path);
                        img.alt=peopleJson.name+'_img';
                        let divImg=document.createElement('div');
                        divImg.className='personImg';
                        divImg.append(img);
        
                        let divName=document.createElement('div');
                        divName.className="personName";
                        divName.textContent=peopleJson.name;
                        divName.setAttribute('data-item-id', peopleJson.id);
                        divName.addEventListener('click',app.getMovies);
        
                        let divMovie=document.createElement('div');
                        divMovie.className="personMovie";
                        divMovie.textContent=peopleJson.known_for_department;
        
                        btn=document.createElement('button');
                        btn.className="btnDetail";
                        btn.textContent="Detail View";
                        btn.setAttribute('data-item-id', peopleJson.id);
                        btn.addEventListener('click',app.getMovies);
                        divMovie.append(btn);
        
                        div.append(divImg,divName,divMovie);
                        // // img.src = "https://picsum.photos/id/"+imgJson.id+"/400/300"; 
                        //  img.src =imgPath;
                        //  img.alt=imgJson.author;
                        peopleList.append(div);
                      });
                    
                    //document.getElementById('peopleList').innerHTML = JSON.stringify(app.data, null, 4);
                })
                .catch(function(err){
                    alert(err);
                });
            },
            getMovies:(ev)=>{
               
                let wasClicked = ev.target;
                let div=wasClicked.closest('[data-item-id]');
              
               console.log(ev.target+" "+ev.currentTarget);
                let id=parseInt(div.getAttribute('data-item-id'));
                let person=app.data.find(personObj=>personObj.id===id);
             
                console.log('config:', person);
                app.nav('movieList');
                let outputMovie=document.getElementById('outputMovie');
                let divActor=document.createElement('div');
                let actorImg=document.createElement('img');
                actorImg.src="".concat('https://image.tmdb.org/t/p/w470_and_h470_face/',person.profile_path);
                let pName=document.createElement('p');
                pName.textContent=person.name;
                outputMovie.append(actorImg,pName);
                let divProfile=document.createElement('div');
                divProfile.textContent=
                person.known_for.map(function(movie) { 
        
                    let div = document.createElement('div'); 
                    div.className="divListItem";
                    let img=document.createElement('img');
                    img.src="".concat('https://image.tmdb.org/t/p/w150_and_h225_bestv2/',movie.poster_path);
                    let divImg=document.createElement('div');
                    divImg.className='movieImg';
                    divImg.append(img);
                    
                    let divName=document.createElement('div');
                    divName.className="movieName";
                    divName.textContent=movie.title;
              
                    let divEtc=document.createElement('div');
                    divEtc.className="movieEtc";
                    divEtc.textContent=movie.media_type;
        
                    btn=document.createElement('button');
                    btn.className="btnDetail";
                    btn.textContent="Detail View";
                    btn.setAttribute('data-item-id', movie.id);
                    btn.addEventListener('click',app.getMovie);
                    divEtc.append(btn);
        
                    
                    div.append(divImg,divName,divEtc);
                    // // img.src = "https://picsum.photos/id/"+imgJson.id+"/400/300"; 
                    //  img.src =imgPath;
                    //  img.alt=imgJson.author;
                    outputMovie.append(div);
                });
            },
            getMovie:(ev)=>{
                
                let wasClicked = ev.target;
                let div=wasClicked.closest('[data-item-id]');
               console.log(ev.target+" "+ev.currentTarget);
                let movieId=parseInt(div.getAttribute('data-item-id'));
                //let movie=app.movieData.find(movies=>movies.id===id);
                console.log(movieId);
                let url = "".concat(app.baseURL, 'movie/',movieId,'?api_key=',app.APIKEY); 
                fetch(url)
                .then((result)=>{
                    return result.json();
                })
                .then((data)=>{
                      //process the returned data
                       // document.getElementById('output').innerHTML = JSON.stringify(data, null, 4);
                        //work with results array...
                        
                    // baseImageURL = data.images.secure_base_url;
                    app.movieData = data;
                    console.log('config:', data);
                    app.nav('movieDetail');
                    let movieDetail=document.getElementById('outputDetailMovie');
                   
                    let img=document.createElement('img');
                    img.src="".concat('https://image.tmdb.org/t/p/w300_and_h450_bestv2/',data.poster_path);
                    let divImg=document.createElement('div');
                    divImg.className='personImg';
                    divImg.append(img);
                    let pTitle=document.createElement('p');
                    pTitle.textContent=data.title;
                    movieDetail.append(divImg);
                    for(item in data){
                        let divList = document.createElement('div'); 
                        divList.className="divListItem";
        
                        let divLabel=document.createElement('div');
                        divLabel.className="divMovieLabel";
                        divLabel.textContent=item+":";
                        
                        let divMovieVal=document.createElement('div');
                        divMovieVal.className="divMovieValue";
                        divMovieVal.textContent=data[item];
                        divList.append(divLabel,divMovieVal);
                        movieDetail.append(divList)
                    };
                      
                    //document.getElementById('peopleList').innerHTML = JSON.stringify(app.data, null, 4);
                })
                .catch(function(err){
                    alert(err);
                }); 
            },
            showPara: (ev)=>{
                ev.preventDefault();
                let wasClicked = ev.target;
                let li=wasClicked.closest('[data-item-id]');
               console.log(ev.target+" "+ev.currentTarget);
                let id=parseInt(li.getAttribute('data-item-id'));
                let person=app.data.find(personObj=>personObj.id===id);
                let para=document.querySelector('#results p');
                para.textContent=person.name;
            },  
            nav: function(pageId){   //
                //ev.preventDefault();
                document.querySelector('.active').classList.remove('active');
                document.getElementById(pageId).classList.add('active');
                console.log(pageId)
                history.pushState({}, pageId, `#${pageId}`);
                //document.getElementById(pageId).dispatchEvent(app.show);
            },
            poppin: function(ev){
                console.log(location.hash, 'popstate event');
                let hash = location.hash.replace('#' ,'');
                document.querySelector('.active').classListestt.remove('active');
                document.getElementById(hash).classList.add('active');
                console.log(hash)
                //history.pushState({}, currentPage, `#${currentPage}`);
                //document.getElementById(hash).dispatchEvent(app.show);
            },
            test:()=>{
                alert('test');
            }
        }
        
        document.addEventListener('DOMContentLoaded', app.init);
        
        