<template>
    <div class="container">
        <div class="row bg-white mt-5">
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body id="canvas-html">
                <div v-html="this.componentSelection"></div>
                
               <div class="container">
                    <div class="row p-2">
                        <div class="card btn-add-component" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <div class="card-body text-center">
                                <i class="fa fa-fw fa-plus"></i> add component.
                            </div>
                        </div>
                    </div>
               </div>
            </body>
            </html>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Component</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="list-group mt-2" v-for="(item, index) in this.viewCollapseComponent" v-bind:key="index">
                    <div class="list-group-item list-group-item-action active" aria-current="true">
                        {{item.name}}
                    </div>
                    <a href="#" @click.prevent="" @click="this.selectComponent(comp)" class="list-group-item list-group-item-action" data-bs-dismiss="modal" aria-label="Close" v-for="(comp, i) in item.components" v-bind:key="i">{{comp.name}}</a>
                </div>
                <!-- <ul class="list-group" v-for="(item, index) in this.viewCollapseComponent" v-bind:key="index">
                    <li class="list-group-item" data-bs-toggle="collapse" v-bind:href=item.target aria-expanded="false" >{{item.name}}</li>
                    <div class="collapse" v-bind:id=item.target>
                        <div class="card card-body">
                            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                        </div>
                    </div>
                </ul> -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Understood</button>
            </div>
            </div>
        </div>
    </div>


    
</template>