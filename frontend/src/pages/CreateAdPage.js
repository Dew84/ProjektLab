import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import adService from "../services/adService";
import categoryService from "../services/categoryService";
import pictureService from "../services/pictureService";
import "./CreateAdPage.css";

const API_URL = process.env.REACT_APP_API_URL;
const BASE_URL = API_URL.replace(/\/api$/, "");

function CreateAdPage({ user }) {
  const { id } = useParams();               // /ads/create → undefined, /ads/edit/:id → pl. "7"
  const adId = id ? parseInt(id, 10) : null;
  const isEdit = !!adId;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);             // új képfájlok
  const [imagePreviews, setImagePreviews] = useState([]); // URL-ek (meglévő + új preview)
  const [originalImages, setOriginalImages] = useState([]); // eredeti képek az ad-ból
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [seller, setSeller] = useState(null);
  const [warning, setWarning] = useState("");

  // Kategóriák betöltése
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await categoryService.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Hiba a kategóriák betöltésekor:", err);
      }
    };
    fetchCategories();
  }, []);

  // Meglévő hirdetés betöltése
  useEffect(() => {
    if (!isEdit) return;

    const fetchAd = async () => {
      try {
        const ad = await adService.getAdById(adId);
        setTitle(ad.title);
        setDescription(ad.description);
        setPrice(ad.price);
        setCategoryId(ad.categoryIds?.[0] || "");
        setSeller(ad.userId);
      } catch (err) {
        console.error("Hiba a hirdetés betöltésekor:", err);
      }
    };
    fetchAd();
  }, [isEdit, adId]);

  // Képek betöltése meglévő hirdetéshez
  useEffect(() => {
    if (!isEdit) return;

    const fetchPictures = async () => {
      try {
        const picturesData = await pictureService.getPictures(adId);
        const formatted = picturesData.map((p) => ({
          fileName: p.fileName,
          url: `${BASE_URL}/images/${adId}/${p.fileName}`,
        }));

        if (formatted.length === 0) {
          setWarning("Ez a hirdetés nem tartalmaz képeket!");
        }

        setOriginalImages(formatted);
        setImagePreviews(formatted.map((p) => p.url));
        console.log("Betöltött képek:", formatted);
      } catch (err) {
        console.error(err.message || "Hiba történt a képek betöltéskor.");
      }
    };

    fetchPictures();
  }, [isEdit, adId]);

  // Új képek kezelése
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  // Kép eltávolítása (csak kliens oldalon)
  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Hirdetés mentése / módosítása
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    // elmentjük a jelenlegi usert sellerként, ha kell
    setSeller(user?.id ?? null);

    if (!title || !price) {
      setError("A cím és az ár kitöltése kötelező!");
      setLoading(false);
      return;
    }

    try {
      const adData = {
        title,
        description,
        price: parseFloat(price),
        categoryIds: categoryId ? [parseInt(categoryId)] : [],
      };

      const token = localStorage.getItem("token");
      let resultAd;

      if (isEdit) {
        // Módosítás
        resultAd = await adService.updateAd(adId, adData, token);

        // Törölt képek (amik az eredetiből eltűntek)
        for (const img of originalImages) {
          if (!imagePreviews.includes(img.url)) {
            await pictureService.deletePicture(img.fileName);
          }
        }

        const newImages = images.filter((img) => img instanceof File);
        if (newImages.length > 0) {
          await pictureService.uploadPictures(adId, newImages);
        }
      } else {
        // Új hirdetés
        resultAd = await adService.createAd(adData, token);
        if (images.length > 0) {
          await pictureService.uploadPictures(resultAd.id, images);
        }
      }

      setSuccessMessage(isEdit ? "Sikeres módosítás!" : "Sikeres felvitel!");
      if (!isEdit) {
        setTitle("");
        setDescription("");
        setPrice("");
        setCategoryId("");
        setImages([]);
        setImagePreviews([]);
        setOriginalImages([]);
        setWarning("");
      }
    } catch (err) {
      console.error(err);
      setError("Hiba történt a hirdetés mentése során.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="create-ad-page">
        <h1>{isEdit ? "Hirdetés módosítása" : "Új hirdetés felvitele"}</h1>
        <form className="create-ad-form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          {warning && <div className="warning">{warning}</div>}

          <label>
            Cím*:
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
          </label>

          <label>
            Leírás:
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            Ár*:
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
          </label>

          <label>
            Kategória:
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Kérem válasszon!</option>
              {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
              ))}
            </select>
          </label>

          <label>
            Képek feltöltése:
            <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
            />
          </label>

          {/* Képek előnézete */}
          <div className="image-previews">
            {imagePreviews.map((src, index) => (
                <div key={index} className="image-preview">
                  <img src={src} alt={`preview-${index}`} />
                  <button type="button" onClick={() => removeImage(index)}>
                    ✖
                  </button>
                </div>
            ))}
          </div>

          <button type="submit" disabled={loading}>
            {loading
                ? "Feldolgozás..."
                : isEdit
                    ? "Módosítás"
                    : "Hirdetés felvitele"}
          </button>
        </form>
      </div>
  );
}

export default CreateAdPage;
