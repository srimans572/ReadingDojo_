import React from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Account from './components/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import SignInProtectedRoute from './components/SigninProtect'
import Tool from './components/Tool';
import ToolResult from './components/ToolResult';
import PrintPage from './components/PrintPage';
import PageNotFound from './components/PageNotFound';
import QuizGame from './components/Quiz';
import PrivacyPolicyPage from './components/PrivacyPage';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Signin /></ProtectedRoute>}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/tool-results/mcq/' element={<ProtectedRoute><ToolResult></ToolResult></ProtectedRoute>}/>
          <Route path="/quiz" element={<ProtectedRoute><QuizGame></QuizGame></ProtectedRoute>}/>
          <Route path='/print' element = {<ProtectedRoute><PrintPage></PrintPage></ProtectedRoute>}/>
          <Route path="*" element = {<PageNotFound></PageNotFound>}/>
          <Route path="/privacy-policy" element = {<PrivacyPolicyPage></PrivacyPolicyPage>}/>
          <Route
            path='/account'
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path='/tool' element={<ProtectedRoute><Tool/></ProtectedRoute>}/>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;