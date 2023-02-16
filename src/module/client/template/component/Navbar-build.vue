<template>
    <div class="shadow">
        <div class="page-center">
          <nav class="navbar navbar-expand-lg">
            <ul class="navbar-nav d-flex gap-3">
               <li class="nav-item"><router-link to="/">Back</router-link></li>
            </ul>
            <div class="container-fluid">
              
              <a href="#">
                <div class="profile d-flex my-auto gap-3">
                  
                  <div class="profile__detail my-auto">
                    
                    <p id="title" contenteditable="true"><b>{{this.template.name}}</b></p>
                  </div>
                </div>
              </a>
              
              <div class="cta d-flex gap-2">
                <button class="btn btn-secondary w-10xl">Preview</button>
                <button class="btn btn-primary w-10xl">Download</button>
              </div>
            </div>
          </nav>
        </div>
      </div>
</template>

<script>
export default {
    name: 'Navbar-build',
    props: {
        template: Object,
    }
}
</script>