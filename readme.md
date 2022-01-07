# Clone Google Translate

## Hướng dẫn sử dụng

---

Trong file `app.js`:

```js
...
const translating = () => {
    
    ...

    const options = {

        ...

        headers: {

            ...
            
            'x-rapidapi-key': '{api key}'
            ...
        },
        
        ...

    }

    ...

}
...
```

Các bạn truy cập vào

<https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/>

Tạo tài khoản và lấy api key và thay nó vào `{api key}`
