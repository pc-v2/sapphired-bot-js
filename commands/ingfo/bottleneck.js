const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('bottleneck')
		.setDescription('pengertian bottleneck'),
	async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Apa itu Bottleneck')
            .setAuthor({name: 'collazo'})
            .setDescription("bottleneck gk cuman di gpu di cpu, ram, dan hdd jg bre (kl di hdd paling jarang sih emang) di apps nya pun bisa membuat bottlenecktp dalam inti nya gitu, bottleneck bisa terjadi karna salah satu dari komponen/software pc lu menghambat proses kinerja komponen lain jadi istilah dari bottleneck itu kaya di dunia nyata, jalanan dibuka cmn 1 arah, yg arah sebalik nya di hentikan kaya di Puncak (otomatis itu menghambat arus yg sebalik nya). Tapi tolong di garis bawahi kalau semisal nya mau upgrade vga/Procie dan bakal boneck tolong jangan terlalu pikirin bottleneck tersebut karna bottleneck bisa diakalin dengan settings2 di game nya tersebut dan lagi kl ada budget bisa upgrade agar meminimalisir terjadinya bottleneck. Dan bottleneck ini tidak akan merusak Komponen PC kalian (imo).\n\n\nkita ambil contoh misal games GTA V yang berat di CPU, kita mulai dari cari settingan yg sekiranya bisa beratin kinerja VGA nya agar bisa meminimalisir CPU yg selalu kerja keras, seperti Textures, Shadow, Render scaling, Shaders, DLL, TP kecilin Render scaling nya atau kalau masih terasa tidak enak bisa mulai dari lock FPS mu ke VSYNC (lock ke refresh rate monitor mu 60/75) atau kalau masih gak enak bisa set ke 30 FPS.\n\n\ndan sebalik nya kalau game yg berat di VGA seperti The Witcher 3 bisa melakukan sebalik nya dari cari sampai ketemu settingan yang enak untuk main nya.")
		return interaction.reply({embeds: [embed]});
	},
};
