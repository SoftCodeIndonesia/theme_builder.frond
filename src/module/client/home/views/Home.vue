<template>
    <header>
        <div class="page-center">
            <div class="head_container">
                <div class="identity">
                    <img src="https://mareta.tech/wp-content/uploads/2022/09/logo-1.png">
                </div>
                <div class="menu" id="myTopnav">
                    <ul>
                        <a href="javascript:void(0);" style="font-size:15px;" class="icon" onclick="openNav()">&#9776;</a>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#popular">Popular Template</a></li>
                        <li><a href="#explore">Explore</a></li>
                        <li><a href="#try-it-free">Try it Free!</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
    <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
          <a href="#home">Home</a>
          <a href="#popular">Popular Template</a>
          <a href="#explore">Explore</a>
          <a href="#">Try it Free!</a>
    </div>

    <div class="container-hero" id="home">
        <div class="page-center">
            <section class="hero">
                <div class="hero__left">
                    <span>Example 2 Template Bulder</span>
                    <h1>Find The Easiest Way to Build a Website</h1>
                    <p>Pspss! Here we go..  explore 100+ web templates and try the best experience to bring ideas to life.</p>
                    <div class="cta">
                        <button class="primary"><a href="">Create New</a>
                        </button>
                        <button class="secondary"><a href="">Download</a>
                        </button>
                    </div>
                </div>
                <div class="hero__right">
                    <div class="hero__right--icons">
                        <img src="https://mareta.tech/wp-content/uploads/2022/09/image-2-3.png" alt="Bootstrap" class="ic1">
                        <img src="https://mareta.tech/wp-content/uploads/2022/09/image-3-3.png" alt="Tailwind" class="ic2">
                        <img src="https://mareta.tech/wp-content/uploads/2022/09/image-4-3.png" alt="HTML" class="ic3">
                        <img src="https://mareta.tech/wp-content/uploads/2022/09/image-5-3.png" alt="CSS" class="ic4">

                    </div>
                    <div class="hero__right--object">
                        <img class="desktop" src="https://mareta.tech/wp-content/uploads/2022/09/young-woman-sitting-with-a-laptop-and-waving-her-hand.png" alt="Object">
                        <img src="https://mareta.tech/wp-content/uploads/2022/09/mobile.png" alt="Object" class="mobile">
                    </div>
                </div>
          
            </section>
        </div>
        <div class="path">
           <img src="https://mareta.tech/wp-content/uploads/2022/09/Intersect.png" alt="path">
        </div>
    </div>

    <div class="container-ready-to-use">
        <div class="page-center">
            <div class="ready-to-use">
                <div class="ready-to-use__left">
                    <img  data-animate-in="up" src="https://mareta.tech/wp-content/uploads/2022/08/Image.png" alt="Ready to Use">
                </div>
                <div class="ready-to-use__right">
                    <h2 data-animate-in="right">Ready to use & Customizable</h2>
                    <p data-animate-in="right" data-animate-in-delay="100">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
            </div>
        </div>
    </div>
    <div class="container-ready-to-use">
        <div class="page-center">
            <div class="ready-to-use reverse">
                <div class="ready-to-use__left">
                    <h2 data-animate-in="left">SEO Friendly</h2>
                    <p data-animate-in="left" data-animate-in-delay="100">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
                <div class="ready-to-use__right">
                    <img data-animate-in="up" src="https://mareta.tech/wp-content/uploads/2022/08/Image-1.png" alt="Ready to Use">
                </div>
                
            </div>
        </div>
    </div>

    <div class="container-popular-theme" id="popular">
        <div class="page-center">
            <h2  data-animate-in="down">Popular Theme</h2>
            <div class="popular-theme"  data-animate-in="down" data-animate-in-delay="100">
                <div class="item">
                    <img src="https://mareta.tech/wp-content/uploads/2022/08/proofile-card-1.png" alt="Preview Template">
                    <div class="detail">
                        <div class="detail__info">
                            <h3>John Doe</h3>
                            <p>Lorem Ipsum</p>
                        </div>
                        <div class="detail__link">
                            <button class="secondary"><a href="">View Detail</a></button>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <img src="https://mareta.tech/wp-content/uploads/2022/08/proofile-card-1.png" alt="Preview Template">
                    <div class="detail">
                        <div class="detail__info">
                            <h3>John Doe</h3>
                            <p>Lorem Ipsum</p>
                        </div>
                        <div class="detail__link">
                            <button class="secondary"><a href="">View Detail</a></button>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <img src="https://mareta.tech/wp-content/uploads/2022/08/proofile-card-1.png" alt="Preview Template">
                    <div class="detail">
                        <div class="detail__info">
                            <h3>John Doe</h3>
                            <p>Lorem Ipsum</p>
                        </div>
                        <div class="detail__link">
                           <button class="secondary"><a href="">View Detail</a></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container-filter-templete" id="explore">
        <div class="page-center">
            <div class="filter-template">
                <div class="fiter-template__heading">
                    <h2><span style="color: var(--blue);">100 </span>Web Templates</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
                <div class="filter-template__data">
                    <aside>
                        <div class="search-box"  style="display: none;">
                          <input id="input-promo" type="text" placeholder="Cari promo disini">
                        </div>
                  
                      <div class="scrollToTop" id="sidebar" >
                        
                       
                        <div class="box-sidebar">
                          <h3>Category</h3>
                          <div id="checkbox-product" class="checkbox-sidebar">
                          
                          </div>
                        </div>
                  
                        <div class="box-sidebar">
                          <h3>CSS Framwork</h3>
                          <div id="checkbox-offer" class="checkbox-sidebar"></div>
                        </div>
                   </div>
                      </aside>
                  
                      <section >
                        
                        <p class="no-data">
                          
                        </p>
                        
                        <div id="popular-theme">
                  
                        </div>
                      </section>
                </div>
            </div>
        </div>
    </div>

    <div class="container-start-project" id="try-it-free">
        <div class="page-center">
            <div class="start-project">
                <div class="start-project__text">
                    <h2>Start your website project</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                </div>
                <div class="cta">
                    <button class="primary pulse">
                        Try it free
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="footer"  id="footer">
        <div class="page-center">
            <div class="footer__top">
                <div class="footer__top--item">
                    <p>Products</p>
                    <ul>
                        <li><a href="#">ThemeBuilder Freemium</a></li>
                        <li><a href="#">ThemeBuilder Pro</a></li>
                        <li><a href="#">Pricing</a></li>
                    </ul>
                </div>
                <div class="footer__top--item">
                    <p>Categories</p>
                    <ul>
                        <li><a href="#">Agency</a></li>
                        <li><a href="#">Business</a></li>
                        <li><a href="#">Dashboard</a></li>
                        <li><a href="#">E-Commerce</a></li>
                        <li><a href="#">Landing Pages</a></li>
                        <li><a href="#">Personal Website</a></li>
                    </ul>
                </div>
                <div class="footer__top--item">
                    <p>About</p>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">FAQs</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer__bottom">
                © 2022 ThemeBuilder. All Rights Reserved
            </div>
        </div>
    </div>
</template>


<style>
    @import '../../../../assets/css/style.css';
</style>