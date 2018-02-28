import React, { Component } from 'react';
import { Upload, Icon, message, Modal } from 'antd';

import styles from './styles.scss';

class MyUpload extends Component {

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };


    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = (info) => {
        info.file.status = 'done';
        let fileList = info.fileList;
        this.setState({fileList});
    };

    customRequest(action) {
        // console.log(action);
        this.props.uploadFile(action.file);
    }


    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div className={styles.uploadArea}>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">{this.props.content}</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div>
                <Upload
                    className={styles.uploadArea}
                    action=""
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    customRequest={this.customRequest.bind(this)}
                >
                    {fileList.length == 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>

        );
    }
}

export default MyUpload;