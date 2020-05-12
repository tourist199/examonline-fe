import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'

import Storage from '@/utils/storage'
import Loading from '@/components/loading'
import Page from '@/components/page'
import Header from './header'
import SideBar from './side-bar'

const Login = lazy(() => import('@/pages/account/login'))
const Home = lazy(() => import('@/pages/home'))
const Settings = lazy(() => import('@/pages/settings'))
const StudentInformation = lazy(() => import('@/pages/StudentInformation'))
const TestSchedule = lazy(() => import('@/pages/TestSchedule'))
const LichSuThi = lazy(() => import('@/pages/lichsuthi'))
const QuanLyDe = lazy(() => import('@/pages/quanlyde'))
const NewUser = lazy(() => import('@/pages/NewUser'))
const ListUser = lazy(() => import('@/pages/ListUser'))
const XemDanhSach = lazy(() => import('@/pages/xemdanhsach'))
const TaoDeThi = lazy(() => import('@/pages/taodethi'))
const CreateExam = lazy(() => import('@/pages/CreateExam'))
const ThongTinCaNhanGiaoVien = lazy(() => import('@/pages/thongtincanhangiaovien'))
const NotFound = lazy(() => import('@/pages/not-found'))

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const HorizontalBox = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`

const PrivateRoute = ({ condition, redirect, ...props }) => {
  condition = condition()

  if (condition) return <Route {...props} />
  return <Redirect to={redirect} />
}

class Routes extends Component {
  _renderLazyComponent = (LazyComponent, params) => (props) => <LazyComponent {...props} {...params} />

  _renderAuthRoutes = () => (
    <>
      <Header />
      <HorizontalBox>
        <SideBar />
        <Suspense fallback={<Page sidebar><Loading /></Page>}>
          <Switch>
            <Route exact path="/" component={this._renderLazyComponent(Home)} />
            <Route exact path="/settings" component={this._renderLazyComponent(Settings)} />
            <Route exact path="/student-information" component={this._renderLazyComponent(StudentInformation)} />
            <Route exact path="/test-schedule" component={this._renderLazyComponent(TestSchedule)} />
            <Route exact path="/lichsuthi" component={this._renderLazyComponent(LichSuThi)} />
            <Route exact path="/quanlyde" component={this._renderLazyComponent(QuanLyDe)} />
            <Route exact path="/new-user" component={this._renderLazyComponent(NewUser)} />
            <Route exact path="/list-user" component={this._renderLazyComponent(ListUser)} />
            <Route exact path="/xemdanhsach" component={this._renderLazyComponent(XemDanhSach)} />
            <Route exact path="/taodethi" component={this._renderLazyComponent(TaoDeThi)} />
            <Route exact path="/create-exam" component={this._renderLazyComponent(CreateExam)} />
            <Route exact path="/thongtincanhangiaovien" component={this._renderLazyComponent(ThongTinCaNhanGiaoVien)} />

            <Redirect to="/not-found" />
          </Switch>
        </Suspense>
      </HorizontalBox>
    </>
  )

  render() {
    return (
      <VerticalBox>
        <Suspense fallback={<Page><Loading /></Page>}>
          <Switch>
            <Route path="/login" component={this._renderLazyComponent(Login)} />
            <Route path="/not-found" component={this._renderLazyComponent(NotFound)} />
            <PrivateRoute
              condition={() => Storage.has('ACCESS_TOKEN')}
              redirect="/login"
              path="/"
              component={this._renderAuthRoutes}
            />
          </Switch>
        </Suspense>
      </VerticalBox>
    )
  }
}

export default Routes
