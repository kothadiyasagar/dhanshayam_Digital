import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Form, Input, Select } from 'antd'
import './App.css';
const { Option } = Select

const App = () => {
  const [categories, setCategories] = useState([])
  const[selectS , setselect] = useState("")

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    const data = await fetch('http://localhost:8085/categories')
    const categories = await data.json()
    setCategories(categories)
  }

  const createNewCategory = async (formValues) => {
    console.log(formValues,"sagar")
    await fetch('http://localhost:8085/categories', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues)
    })
    await getCategories()
  }

  const categoryOpts = categories.map((category, index) => <Option key={`cat-option-${index}`} value={category._id}>
    {category.name}
  </Option>)

  const rootCategory = categories.find((category) => category?._id?.toString() === '62bfd4c158c0a636474a8b7f')
  console.log(rootCategory)

  const renderItem = (item) => <li  onClick={()=>setselect(item.name)}>{item.name}</li>

  const renderListItems = (category) => {
    return category?.subCategories?.map((subCategory) => {
      const matchedCategory = typeof subCategory === 'object' ? subCategory : categories.find((cat) => cat._id?.toString() === subCategory?.toString())
      console.log({ matchedCategory })
      return !matchedCategory.subCategories.length ? renderItem(matchedCategory) :
        <li onClick={()=>setselect(matchedCategory.name)}>
          {matchedCategory.name}
          <ul>
            {renderListItems(matchedCategory)}
          </ul>
        </li>
    })
  }

  const renderedCategories = <ul>{renderListItems(rootCategory)}</ul>

  return (
    <div className="App">
      <Row>
        <Col span={12}  style={{ display: '', height: '100vh', marginTop: '100px',textAlign:"start",marginLeft:"100px" }}>
          <h1>Category list</h1>
          <ul>
            {
              renderedCategories
            }
          </ul>
        </Col>
        
        <Col span={10} style={{ display: '', height: '100vh', marginTop: '100px',textAlign:"start" }}>
        <h1>Add new user</h1>
          <Form style={{ width: '90%' }} onFinish={createNewCategory}>
            <Form.Item label='Name' name='name' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label='Category' name='parent' rules={[{ required: true }]}>
              <Select  placeholder={selectS} >
                {categoryOpts}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Add New</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </div>
  );
}

export default App;
