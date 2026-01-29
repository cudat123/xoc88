const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint
app.get('/api/xoc88', async (req, res) => {
  try {
    // Gọi API gốc
    const response = await axios.get('https://xoc88.hacksieucap.pro/xoc88dd');
    
    // Chuyển đổi dữ liệu
    const transformedData = {
      ...response.data,
      phien_hien_tai: response.data.next_session,
      du_doan: response.data.prediction
    };
    
    // Xóa các trường cũ
    delete transformedData.next_session;
    delete transformedData.prediction;
    
    // Trả về dữ liệu đã chuyển đổi
    res.json(transformedData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Không thể lấy dữ liệu từ API' 
    });
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
  console.log(`Endpoint: http://localhost:${PORT}/api/xoc88`);
});
