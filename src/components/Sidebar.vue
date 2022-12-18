<template>
    <!-- sidebar -->
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header">
            <router-link to="/" id="offcanvasWithBothOptionsLabel">Main Menu</router-link>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p class="font-bold text-muted">MANAGEMENT</p>
            <div class="list-group list-group-menu-sidebar">
                <router-link to="/rules" class="list-group-item text-muted border-none px-0 list-group-item-action">Role</router-link>
                <router-link to="/user" class="list-group-item text-muted border-none px-0 list-group-item-action">Users</router-link>
                <!-- <router-link to="/section" class="list-group-item text-muted border-none px-0 list-group-item-action">Section</router-link> -->
                <router-link to="/component" class="list-group-item text-muted border-none px-0 list-group-item-action">Component</router-link>
                <router-link to="/meta" class="list-group-item text-muted border-none px-0 list-group-item-action">Meta Data</router-link>
                <!-- <a class="list-group-item border-none px-0 list-group-item-action" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Link with href
                </a>
                    <div class="collapse mt-2" id="collapseExample">
                        <div class="card card-body border-none">
                            Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                        </div>
                    </div>
                 -->
            </div>
        </div>
    </div>
</template>