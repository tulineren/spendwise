import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

const KATEGORILER = ['Yemek', 'Ulaşım', 'Market', 'Eğlence', 'Diğer'];

export default function App() {
  const [tutar, setTutar] = useState('');
  const [seciliKategori, setSeciliKategori] = useState(KATEGORILER[0]);
  const [harcamalar, setHarcamalar] = useState([]);

  const harcamaEkle = () => {
    if (!tutar || isNaN(tutar)) return;

    const yeniHarcama = {
      id: Date.now().toString(),
      tutar: parseFloat(tutar),
      kategori: seciliKategori,
      tarih: new Date().toLocaleDateString('tr-TR'),
    };

    setHarcamalar([yeniHarcama, ...harcamalar]);
    setTutar('');
  };

  const toplam = harcamalar.reduce((acc, h) => acc + h.tutar, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.baslik}> SpendWise</Text>

      <View style={styles.toplamKutu}>
        <Text style={styles.toplamLabel}>Toplam Harcama</Text>
        <Text style={styles.toplamTutar}>{toplam.toFixed(2)} TL</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Tutar girin (örn. 150)"
          keyboardType="numeric"
          value={tutar}
          onChangeText={setTutar}
        />

        <View style={styles.kategoriSatir}>
          {KATEGORILER.map((kat) => (
            <TouchableOpacity
              key={kat}
              style={[
                styles.kategoriButon,
                seciliKategori === kat && styles.kategoriButonAktif,
              ]}
              onPress={() => setSeciliKategori(kat)}
            >
              <Text
                style={[
                  styles.kategoriText,
                  seciliKategori === kat && styles.kategoriTextAktif,
                ]}
              >
                {kat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.ekleButon} onPress={harcamaEkle}>
          <Text style={styles.ekleButonText}>+ Harcama Ekle</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listeBaslik}>Son Harcamalar</Text>
      <FlatList
        data={harcamalar}
        keyExtractor={(item) => item.id}
        style={styles.liste}
        ListEmptyComponent={
          <Text style={styles.bosMesaj}>Henüz harcama eklenmedi</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.harcamaSatiri}>
            <View>
              <Text style={styles.harcamaKategori}>{item.kategori}</Text>
              <Text style={styles.harcamaTarih}>{item.tarih}</Text>
            </View>
            <Text style={styles.harcamaTutar}>{item.tutar.toFixed(2)} TL</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  baslik: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1A1A2E',
  },
  toplamKutu: {
    backgroundColor: '#6C5CE7',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  toplamLabel: {
    color: '#E0DFFF',
    fontSize: 14,
  },
  toplamTutar: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  kategoriSatir: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  kategoriButon: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#F0F0F5',
  },
  kategoriButonAktif: {
    backgroundColor: '#6C5CE7',
  },
  kategoriText: {
    color: '#555',
    fontSize: 13,
  },
  kategoriTextAktif: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  ekleButon: {
    backgroundColor: '#1A1A2E',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ekleButonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listeBaslik: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1A1A2E',
  },
  liste: {
    flex: 1,
  },
  bosMesaj: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  harcamaSatiri: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  harcamaKategori: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  harcamaTarih: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  harcamaTutar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C5CE7',
  },
});