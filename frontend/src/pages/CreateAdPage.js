import React, { useState, useEffect } from "react";
import adService from "../services/adService";
import categoryService from "../services/categoryService";
import pictureService from "../services/pictureService";
import "./CreateAdPage.css";

function CreateAdPage({ setUser, adId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [seller, setSeller] = useState(null);

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

  console.log("CreateAdPage adId:", adId);

  // Meglévő hirdetés betöltése
  useEffect(() => {
    if (!adId) return;
    const fetchAd = async () => {
      try {
        const ad = await adService.getAdById(adId);
        setTitle(ad.title);
        setDescription(ad.description);
        setPrice(ad.price);
        setCategoryId(ad.categoryIds[0] || "");
        setImagePreviews(ad.images || []);
        setSeller(ad.userId);
      } catch (err) {
        console.error("Hiba a hirdetés betöltésekor:", err);
      }
    };
    fetchAd();
  }, [adId]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");
    setSeller(setUser);

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

      if (adId) {
        // Update meglévő hirdetés
        resultAd = await adService.updateAd(adId, adData, token);
      } else {
        // Új hirdetés létrehozása
        resultAd = await adService.createAd(adData, token);
      }

      if (images.length > 0) {
        await pictureService.uploadPictures(resultAd.id, images);
      }

      setSuccessMessage(adId ? "Sikeres módosítás!" : "Sikeres felvitel!");
      if (!adId) {
        setTitle("");
        setDescription("");
        setPrice("");
        setCategoryId("");
        setImages([]);
        setImagePreviews([]);
      }
    } catch (err) {
      console.error(err);
      setError(err || "Hiba történt a hirdetés mentése során.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-ad-page">
      <h1>{adId ? "Hirdetés módosítása" : "Új hirdetés felvitele"}</h1>
      <form className="create-ad-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}

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

        {/* Kép preview */}
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
          {loading ? "Feldolgozás..." : adId ? "Módosítás" : "Hirdetés felvitele"}
        </button>
      </form>
    </div>
  );
}

export default CreateAdPage;
