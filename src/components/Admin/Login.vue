<template>
  <div class="login-wrapper">
    <!-- Back to site link -->
    <router-link to="/" class="login-back-logo">
      PORTFOLIO
    </router-link>

    <div class="login-card">
      <h2 class="login-title">Admin Access</h2>
      <p class="login-subtitle">Sign in to manage your CMS database settings</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <!-- Error Message -->
        <div v-if="errorMessage" class="login-error">
          {{ errorMessage }}
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="login-success">
          {{ successMessage }}
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            placeholder="admin@example.com"
            class="form-input"
            :disabled="isLoading"
          />
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            placeholder="••••••••"
            class="form-input"
            :disabled="isLoading"
          />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn-pill login-btn" :disabled="isLoading" id="login-submit-btn">
          <span v-if="isLoading" class="spinner"></span>
          <span v-else>Sign In</span>
        </button>

        <!-- Credentials Hint -->
        <div class="credentials-hint">
          <div>Demo Email: <strong>admin@example.com</strong></div>
          <div>Demo Password: <strong>password123</strong></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { localCms } from '../../localCms';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    isLoading.value = true;
    
    // Simulate slight loading delay for premium feeling
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const success = localCms.login(email.value, password.value);

    if (!success) {
      throw new Error('Invalid email or password credentials.');
    }

    successMessage.value = 'Login successful! Redirecting...';
    
    email.value = '';
    password.value = '';
    
    setTimeout(() => {
      router.push('/th3w3b4dm1n/dashboard');
    }, 1000);

  } catch (error) {
    errorMessage.value = error.message || 'Invalid login credentials.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@import './Login.css';
</style>
