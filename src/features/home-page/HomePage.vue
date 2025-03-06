<template>
  <v-card class="fill-height">
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item :to="{ name: 'Dashboard' }" prepend-avatar="@/assets/logo.png" 
            subtitle="simple is beutiful"
            title="Veutify Blog">
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-plus" title="New Post" value="myfiles" :to="{ name: 'Editor' }"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Analytics" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh;">
        <router-view></router-view>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup lang="ts">
</script>
