<template>
  <div class="face-login-container">
    <div class="face-login-content">
      <div class="header">
        <h1>UNINwalk</h1>
        <img src="../assets/logo-mobile.svg" class="login-page-image" alt="">
        <h3>{{ $t('loginPageTitle') }}</h3>
    
        <div class="buttons-wrapper">
          <div class="buttons">
            <Button
              :suffix="$t('loginButton')"
              @click="mode = 'login'"
              :class="{ active: mode === 'login' }"
            />
            <Button
              :suffix="$t('registerButton')"
              variant="secondary"
              @click="mode = 'register'"
              :class="{ active: mode === 'register' }"
            />
          </div>
          <Button
            :suffix="$t('enterAsGuestButton')"
            @click="continueAsGuest"
          />
        </div>
      </div>
      <div class="loading-status" v-if="!modelsLoaded">
        <p>Loading face recognition models... {{ loadingProgress }}</p>
        <div class="loading-bar">
          <div class="loading-fill" :style="{ width: loadingProgress }"></div>
        </div>
      </div>
      <div v-if="modelsLoaded" class="camera-section">
        <video
          ref="videoElement"
          autoplay
          muted
          playsinline
          v-show="showCamera"
          @loadedmetadata="onVideoLoaded"
        ></video>
    
        <canvas
          ref="canvasElement"
          class="overlay-canvas"
          v-show="showCamera"
        ></canvas>
    
        <div v-if="capturedImage" class="captured-image">
          <img :src="capturedImage" alt="Captured face" />
          <Button suffix="Retake Photo" @click="retakePhoto" class="retake-button" />
        </div>
      </div>
      <!-- Registration Form -->
      <div v-if="mode === 'register' && modelsLoaded" class="register-form">
        <div class="form-group">
          <label for="studentEmail">Email:</label>
          <input
            id="studentEmail"
            v-model="studentEmail"
            type="email"
            placeholder="Enter email address"
            :disabled="processing"
          />
        </div>
    
        <div class="form-group">
          <label for="studentName">Name:</label>
          <input
            id="studentName"
            v-model="studentName"
            type="text"
            placeholder="Enter full name"
            :disabled="processing"
          />
        </div>
      </div>
      <div v-if="modelsLoaded && (mode === 'register' || mode === 'login')">
        <Button
          v-if="!showCamera && !capturedImage"
          suffix="Start camera"
          :disabled="processing"
          @click="startCamera"
        />
        <Button
          v-if="showCamera"
          suffix="Capture photo"
          :disabled="processing"
          @click="capturePhoto"
        />
    
        <Button
          v-if="capturedImage"
          :suffix="mode === 'login' ? 'Login' : 'Register Student'"
          :disabled="processing || (mode === 'register' && (!studentEmail || !studentName))"
          @click="submitPhoto"
        />
      </div>
      <div class="status" v-if="status">
        <div :class="['status-message', statusType]">
          {{ status }}
        </div>
      </div>
      <div v-if="loginResult" class="login-result">
        <div v-if="loginResult.success" class="success-result">
          <h3>Login Successful!</h3>
          <p><strong>Welcome:</strong> {{ loginResult.student.name }}</p>
          <p><strong>Email:</strong> {{ loginResult.student.email }}</p>
          <p><strong>Confidence:</strong> {{ (loginResult.confidence * 100).toFixed(1) }}%</p>
        </div>
        <div v-else class="error-result">
          <h3>Login Failed</h3>
          <p>{{ loginResult.message }}</p>
        </div>
      </div>
      <!-- Students List -->
      <div v-if="modelsLoaded" class="students-section">
        <h3>{{ $t('registeredStudentsTitle') }} ({{ Object.keys(registeredStudents).length }})</h3>
        <div v-if="Object.keys(registeredStudents).length > 0" class="students-list">
          <div v-for="(student, email) in registeredStudents" :key="email" class="student-card">
            <div>
              <strong>{{ student.name }}</strong><br>
              <small>Email: {{ email }}</small><br>
              <small>{{ $t('registered') }}: {{ new Date(student.registeredAt).toLocaleString() }}</small>
            </div>
            <Button :suffix="$t('deleteButton')" @click="deleteStudent(email)" class="delete-btn" />
          </div>
        </div>
        <p v-else>No students registered yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as faceapi from 'face-api.js'
import Button from './UI/Button.vue'
import { useI18n } from 'vue-i18n';

// Define emits
const emit = defineEmits(['login-success'])
const { t } = useI18n();

// Refs
const videoElement = ref(null)
const canvasElement = ref(null)
const showCamera = ref(false)
const capturedImage = ref(null)
const mode = ref('')
const studentEmail = ref('')
const studentName = ref('')
const status = ref('')
const statusType = ref('info')
const processing = ref(false)
const loginResult = ref(null)
const modelsLoaded = ref(false)
const loadingProgress = ref('0%')

// Student data storage (will persist in browser)
const registeredStudents = ref({})

let stream = null

onMounted(async () => {
  loadStudentsFromStorage()
  await loadModels()
})

onUnmounted(() => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
  }
})

function continueAsGuest() {
  localStorage.setItem('userEmail', 'Guest');
  emit('login-success', 'Guest');
}

function loadStudentsFromStorage() {
  const saved = localStorage.getItem('faceRecognitionStudents')
  if (saved) {
    registeredStudents.value = JSON.parse(saved)
  }
}

function saveStudentsToStorage() {
  localStorage.setItem('faceRecognitionStudents', JSON.stringify(registeredStudents.value))
}

async function loadModels() {
  try {
    loadingProgress.value = '10%'
    
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
    loadingProgress.value = '40%'
    
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
    loadingProgress.value = '70%'
    
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
    loadingProgress.value = '100%'
    
    modelsLoaded.value = true
    statusType.value = 'success'
    
  } catch (error) {
    statusType.value = 'error'
    console.error('Model loading error:', error)
  }
}

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ 
      video: { width: 640, height: 480 } 
    })
    videoElement.value.srcObject = stream
    showCamera.value = true
    status.value = 'Camera started. Position your face in the frame.'
    statusType.value = 'info'
    loginResult.value = null
  } catch (error) {
    status.value = 'Error accessing camera: ' + error.message
    statusType.value = 'error'
  }
}

function onVideoLoaded() {
  if (canvasElement.value && videoElement.value) {
    canvasElement.value.width = videoElement.value.videoWidth
    canvasElement.value.height = videoElement.value.videoHeight
  }
}

async function capturePhoto() {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  
  canvas.width = videoElement.value.videoWidth
  canvas.height = videoElement.value.videoHeight
  
  context.drawImage(videoElement.value, 0, 0)
  
  capturedImage.value = canvas.toDataURL('image/jpeg', 0.8)
  showCamera.value = false
  
  // Stop camera
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
  
  status.value = 'Photo captured. Click submit to proceed.'
  statusType.value = 'success'
}

function retakePhoto() {
  capturedImage.value = null
  startCamera()
}

async function submitPhoto() {
  if (!capturedImage.value) return
  
  processing.value = true
  loginResult.value = null
  
  try {
    if (mode.value === 'register') {
      await registerStudent()
    } else {
      await loginStudent()
    }
  } catch (error) {
    status.value = 'Error: ' + error.message
    statusType.value = 'error'
  } finally {
    processing.value = false
  }
}

async function registerStudent() {
  status.value = 'Processing face for registration...'
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(studentEmail.value)) {
    status.value = 'Please enter a valid email address.'
    statusType.value = 'error'
    return
  }
  
  // Create image element from captured image
  const img = new Image()
  img.src = capturedImage.value
  
  await new Promise(resolve => {
    img.onload = resolve
  })
  
  // Detect face and get descriptor
  const detections = await faceapi
    .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor()
  
  if (!detections) {
    status.value = 'No face detected in image. Please try again.'
    statusType.value = 'error'
    return
  }
  
  // Check if student email already exists
  if (registeredStudents.value[studentEmail.value]) {
    status.value = 'Student with this email already exists. Please use a different email.'
    statusType.value = 'error'
    return
  }
  
  // Store student data with face descriptor (using email as key)
  registeredStudents.value[studentEmail.value] = {
    name: studentName.value,
    email: studentEmail.value,
    descriptor: Array.from(detections.descriptor), // Convert Float32Array to regular array
    registeredAt: new Date().toISOString()
  }
  
  // Save to localStorage
  saveStudentsToStorage()
  
  status.value = `Student ${studentName.value} registered successfully!`
  statusType.value = 'success'
  
  // Reset form
  studentEmail.value = ''
  studentName.value = ''
  capturedImage.value = null
}

async function loginStudent() {
  status.value = 'Recognizing face...'
  
  if (Object.keys(registeredStudents.value).length === 0) {
    loginResult.value = {
      success: false,
      message: 'No students registered yet. Please register first.'
    }
    return
  }
  
  // Create image element from captured image
  const img = new Image()
  img.src = capturedImage.value
  
  await new Promise(resolve => {
    img.onload = resolve
  })
  
  // Detect face and get descriptor
  const detections = await faceapi
    .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor()
  
  if (!detections) {
    loginResult.value = {
      success: false,
      message: 'No face detected in image. Please try again.'
    }
    return
  }
  
  // Compare with all registered students
  let bestMatch = null
  let bestDistance = Infinity
  const threshold = 0.6 // Adjust this value for stricter/looser matching
  
  for (const [email, student] of Object.entries(registeredStudents.value)) {
    const storedDescriptor = new Float32Array(student.descriptor)
    const distance = faceapi.euclideanDistance(detections.descriptor, storedDescriptor)
    
    if (distance < threshold && distance < bestDistance) {
      bestDistance = distance
      bestMatch = {
        email: email,
        name: student.name,
        distance: distance,
        confidence: 1 - distance // Convert distance to confidence
      }
    }
  }
  
  if (bestMatch) {
    loginResult.value = {
      success: true,
      student: bestMatch,
      confidence: bestMatch.confidence,
      message: `Welcome back, ${bestMatch.name}!`
    }
    
    // Save user email to localStorage
    localStorage.setItem('userEmail', bestMatch.email)
    
    // Emit login success with email to parent component
    emit('login-success', bestMatch.email)
    
    // Reset captured image after successful login
    setTimeout(() => {
      capturedImage.value = null
    }, 3000)
  } else {
    loginResult.value = {
      success: false,
      message: 'Face not recognized. Please try again or register first.'
    }
  }
}

function deleteStudent(studentEmail) {
  if (confirm(`Are you sure you want to delete student ${registeredStudents.value[studentEmail].name}?`)) {
    delete registeredStudents.value[studentEmail]
    saveStudentsToStorage() // Save after deletion
    status.value = 'Student deleted successfully.'
    statusType.value = 'success'
  }
}
</script>