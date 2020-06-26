import React, { Component } from 'react'
import styled from 'styled-components'

import { Layout, Menu, Carousel } from 'antd';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const IntroPage = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
.ant-carousel .slick-slide {
    text-align: center;
    height: 300px;
    // width: 100%;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
  }
  
  .ant-carousel .slick-slide h3 {
    color: #fff;
  }
//   .item-img{
//     background: url('../../resources/images/abc.jpg');
//   }

`

export default class Page extends Component {
    render() {
        return (
            <IntroPage>
                <Layout>

                    <Carousel autoplay>
                        <div className="carousel-item" >
                            <div className="carousel-container">
                                <div className="carousel-content">
                                    <div className="carousel-content">
                                        <h2 className="animated fadeInDown"><span>bannerr </span>1</h2>
                                        <p className="animated fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
                                        <div>
                                            <a href="#menu" className="btn-menu animated fadeIn">Đăng Nhập</a>
                                            <a href="#book-a-table" className="btn-book animated fadeIn">Gì đó</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" >
                            <div className="carousel-container">
                                <div className="carousel-content">
                                    <div className="carousel-content">
                                        <h2 className="animated fadeInDown"><span>bannerr</span> 2</h2>
                                        <p className="animated fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
                                        <div>
                                            <a href="#menu" className="btn-menu animated fadeIn">Đăng Nhập</a>
                                            <a href="#book-a-table" className="btn-book animated fadeIn">Gì đó</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" >
                            <div className="carousel-container">
                                <div className="carousel-content">
                                    <div className="carousel-content">
                                        <h2 className="animated fadeInDown"><span>bannerr</span> 3</h2>
                                        <p className="animated fadeInUp">Ut velit est quam dolor ad a aliquid qui aliquid. Sequi ea ut et est quaerat sequi nihil ut aliquam. Occaecati alias dolorem mollitia ut. Similique ea voluptatem. Esse doloremque accusamus repellendus deleniti vel. Minus et tempore modi architecto.</p>
                                        <div>
                                            <a href="#menu" className="btn-menu animated fadeIn">Đăng Nhập</a>
                                            <a href="#book-a-table" className="btn-book animated fadeIn">Gì đó</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel>

                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </IntroPage>
        )
    }
}
