import * as React from 'react'
import { usePreviewImage } from './store/client'
import ImagePreview from './components/atoms/forms/ImagePreview'
import { Toaster } from './components/ui/toaster'
import { Route, Routes } from 'react-router-dom'
import {
  AuthLayout,
  ProtectedAuth,
  ProtectedRoute,
  ProtectFromStudent,
  ProtectFromTeacher,
  StudentLayout,
  TeacherLayout
} from './components/layouts'
import Home from './pages/Home'
import { ForgotPassword, Login, Register, TeacherLogin, TeacherResetPassword } from './pages/auth'
import { CreateQuestion, CreateQuestionGuide, EditProfile, Games, Questions } from './pages/teacher'
import { PlayGround } from './pages/student'

export default function App() {
  const { previewImage, setPreviewImage } = usePreviewImage((state) => ({
    previewImage: state.previewImage,
    setPreviewImage: state.setPreviewImage
  }))

  return (
    <React.Fragment>
      {previewImage && <ImagePreview image={previewImage} onShow={() => setPreviewImage('')} />}
      <Toaster />
      <Routes>
        <Route element={<ProtectedAuth />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/teacher">
            <Route path="login" element={<TeacherLogin />} />
            <Route path="forgot-password" element={<ForgotPassword variant="teacher" />} />
            <Route path="reset-password" element={<TeacherResetPassword />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectFromTeacher />}>
            <Route element={<StudentLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/game/:gameId/question/:questionId" element={<PlayGround />} />
            </Route>
          </Route>

          <Route element={<ProtectFromStudent />}>
            <Route path="/teacher">
              <Route path="profile/change-password" element={<TeacherResetPassword />} />

              <Route element={<TeacherLayout />}>
                <Route path="profile" element={<EditProfile />} />
                <Route path="game">
                  <Route index element={<Games />} />
                  <Route path=":gameId/question">
                    <Route index element={<Questions />} />
                    <Route path="create" element={<CreateQuestion />} />
                    <Route path="create/guide" element={<CreateQuestionGuide />} />
                    <Route path=":questionId/update" element={<CreateQuestion />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </React.Fragment>
  )
}
