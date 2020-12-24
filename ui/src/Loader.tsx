import React from 'react';
import { Spin, Row, Col } from 'antd';

export function Loader() {
    return (
        <Row align="middle" justify="center">
            <Col>
                <Spin />
            </Col>
        </Row>
    )
}