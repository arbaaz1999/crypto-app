import React, { useState } from 'react';
import moment from 'moment';
import { Select, Typography, Row, Col, Avatar, Card, Divider } from 'antd';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
// import { globalCryptos } from './Cryptocurrencies'

const demoImage = 'https://media.istockphoto.com/photos/wooden-block-cube-stacking-as-step-stair-business-concept-growth-picture-id1337276175'

const News = ({ simplified }) => {
    const count = simplified ? 6 : 12;
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: cryptoNews } = useGetCryptoNewsQuery({ category: newsCategory, count });
    const { data: currencies } = useGetCryptosQuery(100)

    if (!cryptoNews?.value) return <Loader />

    return (
        <>
            <Row gutter={[24, 24]}>
                {!simplified && (<Col span={24}>
                    {
                        <Select
                            showSearch
                            style={{ width: "180px" }}
                            placeholder='Select a Crypto'
                            optionFilterProp='children'
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Select.Option value='Cryptocurrency'>Cryptocurrency</Select.Option>
                            {
                                currencies?.data?.coins.map((coin, i) => (<Select.Option value={coin.name} key={i}>{coin.name}</Select.Option>))
                            }

                        </Select>
                    }
                </Col>)}
                {
                    cryptoNews?.value.map((news, i) => (
                        <Col xs={24} sm={12} lg={8} key={i}>
                            <Card hoverable className='news-card'>
                                <a href={news.url} target="_blank" rel='noreferrer'>
                                    <div className='news-image-container'>
                                        <Typography.Title className="news-title" level={4}>{news.name}</Typography.Title>
                                        <img
                                            src={news?.image?.thumbnail?.contentUrl || demoImage} width="100px" height="100px" alt="news" />
                                    </div>
                                    <p>
                                        {news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
                                    </p>
                                    <div className="provider-container">
                                        <div>
                                            <Avatar size='large' src={news.provider[0].image?.thumbnail?.contentUrl || demoImage} />
                                            <Typography.Text className='provider-name'>{news.provider[0]?.name}</Typography.Text>
                                        </div>
                                        <Typography.Text>{moment(news.datePublished).startOf().fromNow()}</Typography.Text>
                                    </div>
                                </a>
                            </Card>
                        </Col>
                    ))
                }

            </Row>
        </>
    )
}

export default News