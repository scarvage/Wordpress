<!-- start Simple Custom CSS and JS -->
<script type="text/javascript">
/* Default comment here */ 


document.getElementById('graph1Button').addEventListener('click', function() {
    document.getElementById('graph1').style.display = 'block';
    document.getElementById('graph2').style.display = 'none';
});

document.getElementById('graph2Button').addEventListener('click', function() {
    document.getElementById('graph1').style.display = 'none';
    document.getElementById('graph2').style.display = 'block';
});
</script>
<!-- end Simple Custom CSS and JS -->
