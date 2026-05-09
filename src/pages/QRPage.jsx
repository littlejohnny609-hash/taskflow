import { useState } from "react"
import { QRCodeCanvas } from "qrcode.react"
function QRPage() {
  const [text, setText] = useState("")
  return (
    <div className="max-w-xl mx-auto text-center">

      <h1 className="text-2xl font-bold mb-6">
        QR Code Generator
      </h1>
      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter text or URL..."
        className="w-full p-3 border rounded mb-4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/* QR DISPLAY */}
      <div className="flex justify-center mt-6">
        {text && (
          <QRCodeCanvas value={text} size={200} />
        )}
      </div>
    </div>
  )
}
export default QRPage